// Import the functions you need from the SDKs you need
import { initializeApp, getApps, deleteApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import customAxios from "./utils/axios/customAxios";

// Do NOT initialize Firebase immediately with incomplete config
// Instead, export a promise that will resolve when Firebase is properly initialized
let firebaseInitialized = false;
let initializationPromise: Promise<void>;

// Placeholder for exports
export let app: any = null;
export let auth: any = null;
export const googleProvider = new GoogleAuthProvider();

// Create a function that initializes Firebase once we have the config
const initializeFirebase = async () => {
  if (firebaseInitialized) return;

  try {
    console.log("Fetching Firebase configuration from backend...");
    const response = await customAxios.get("/config/firebase");

    if (!response.data?.data?.apiKey) {
      throw new Error("No valid API key received from server");
    }

    const config = response.data.data;

    // Clean up any existing Firebase instances to avoid duplication errors
    getApps().forEach((app) => deleteApp(app));

    // Initialize Firebase with complete config from backend
    const firebaseApp = initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId,
    });

    // Set the exports
    app = firebaseApp;
    auth = getAuth(firebaseApp);

    firebaseInitialized = true;
    console.log("Firebase successfully initialized with config from backend");
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    throw error;
  }
};

// Initialize Firebase immediately and export the promise
initializationPromise = initializeFirebase();

// Export the initialization promise for components that need to wait
export const firebaseReady = () => initializationPromise;
