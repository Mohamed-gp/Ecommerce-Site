"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseConfig = void 0;
/**
 * Provides Firebase configuration to the client
 * Only exposes what's necessary for client authentication
 */
const getFirebaseConfig = (req, res) => {
    try {
        // Only provide the necessary Firebase configuration for client authentication
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: "swiftbuy-e0bf2.firebaseapp.com", // Updated to match frontend
            projectId: "swiftbuy-e0bf2", // Updated to match frontend
            storageBucket: "swiftbuy-e0bf2.appBucket",
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