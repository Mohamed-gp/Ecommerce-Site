// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "swiftbuy-e0bf2.firebaseapp.com",
  projectId: "swiftbuy-e0bf2",
  storageBucket: "swiftbuy-e0bf2",
  messagingSenderId: "519202175438",
  appId: "1:519202175438:web:61d4526dd74444efe1939f",
  measurementId: "G-STL5Y2HXZK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
