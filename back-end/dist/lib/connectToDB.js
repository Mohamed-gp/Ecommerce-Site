"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = async () => {
    try {
        // Set up connection event listeners BEFORE connecting
        mongoose_1.default.connection.on("connected", () => {
            console.log("✅ Connected to MongoDB successfully");
        });
        mongoose_1.default.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.log("🔌 MongoDB disconnected");
        });
        // Handle application termination
        process.on("SIGINT", async () => {
            await mongoose_1.default.connection.close();
            console.log("🔌  MongoDB connection closed due to application termination");
            process.exit(0);
        });
        // Set connection options
        const options = {
            serverSelectionTimeoutMS: 10000, // 10 second timeout
            socketTimeoutMS: 45000, // 45 second socket timeout
            bufferCommands: false, // Disable mongoose buffering
            maxPoolSize: 10, // Maintain up to 10 socket connections
        };
        // Connect to MongoDB
        console.log("🔗 Attempting to connect to MongoDB...");
        await mongoose_1.default.connect(process.env.MONGODB_URI, options);
    }
    catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        throw new Error("Failed to connect to database");
    }
};
exports.default = connectToDB;
//# sourceMappingURL=connectToDB.js.map