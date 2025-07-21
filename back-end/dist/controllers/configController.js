"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseConfig = void 0;
/**
 * Provides Firebase configuration to the client
 * Only exposes what's necessary for client authentication
 */
const getFirebaseConfig = (req, res) => {
    try {
        // Access the environment variable with proper Node.js syntax
        const apiKey = process.env["FIREBASE_API_KEY"];
        // Validate that we have an API key before sending it
        if (!apiKey) {
            console.error("Firebase API key is missing in environment variables");
            return res.status(500).json({
                message: "Firebase configuration is incomplete",
                data: null,
            });
        }
        // Only provide the necessary Firebase configuration for client authentication
        const firebaseConfig = {
            apiKey,
            authDomain: "swiftbuy-e0bf2.firebaseapp.com",
            projectId: "swiftbuy-e0bf2",
            storageBucket: "swiftbuy-e0bf2.appspot.com", // Fixed storage bucket URL
            messagingSenderId: "519202175438",
            appId: "1:519202175438:web:61d4526dd74444efe1939f",
            measurementId: "G-STL5Y2HXZK",
        };
        return res.status(200).json({
            message: "Firebase configuration fetched successfully",
            data: firebaseConfig,
        });
    }
    catch (error) {
        console.error("Error providing Firebase configuration:", error);
        return res.status(500).json({
            message: "Failed to provide Firebase configuration",
            data: null,
        });
    }
};
exports.getFirebaseConfig = getFirebaseConfig;
//# sourceMappingURL=configController.js.map