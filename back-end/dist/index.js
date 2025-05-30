"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const productsRouter_1 = __importDefault(require("./routes/productsRouter"));
const categoriesRouter_1 = __importDefault(require("./routes/categoriesRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
const orderRouter_1 = __importDefault(require("./routes/orderRouter"));
const messagesRouter_1 = __importDefault(require("./routes/messagesRouter"));
const connectToDB_1 = __importDefault(require("./lib/connectToDB"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const errors_1 = require("./middlewares/errors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cartRouter_1 = __importDefault(require("./routes/cartRouter"));
const checkoutRouter_1 = __importDefault(require("./routes/checkoutRouter"));
const commentsRouter_1 = __importDefault(require("./routes/commentsRouter"));
const couponsRouter_1 = __importDefault(require("./routes/couponsRouter"));
dotenv_1.default.config();
const startServer = async () => {
    try {
        // Connect to database first
        await (0, connectToDB_1.default)();
        const app = (0, express_1.default)();
        const PORT = process.env["PORT"] || 3000;
        // Trust proxy for deployment
        app.set("trust proxy", true);
        // Middleware
        app.use((0, cookie_parser_1.default)());
        app.use(express_1.default.json({ limit: "10mb" }));
        app.use(express_1.default.urlencoded({ extended: false, limit: "10mb" }));
        // Enhanced CORS configuration for production
        const allowedOrigins = [
            "http://localhost:5000", // Development
            "http://localhost:5173", // Vite dev server
            "https://swiftbuy.production-server.tech", // Production frontend
            "https://swiftbuy1.production-server.tech", // Production backend (for health checks)
        ];
        app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                // Allow requests with no origin (mobile apps, etc.)
                if (!origin)
                    return callback(null, true);
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                }
                else {
                    return callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization", "Accept"],
            exposedHeaders: ["Content-Range", "X-Content-Range"],
        }));
        // Health check endpoint
        app.get("/health", (_req, res) => {
            res.status(200).json({
                status: "OK",
                timestamp: new Date().toISOString(),
                environment: process.env["NODE_ENV"],
                uptime: process.uptime(),
            });
        });
        // Routes
        app.get("/", (_req, res) => {
            res.json({
                message: "SwiftBuy E-commerce API",
                version: "1.0.0",
                environment: process.env["NODE_ENV"],
                status: "running",
            });
        });
        app.use("/api/auth", authRouter_1.default);
        app.use("/api/users", usersRouter_1.default);
        app.use("/api/products", productsRouter_1.default);
        app.use("/api/categories", categoriesRouter_1.default);
        app.use("/api/cart", cartRouter_1.default);
        app.use("/api/admin", adminRouter_1.default);
        app.use("/api/checkout", checkoutRouter_1.default);
        app.use("/api/comments", commentsRouter_1.default);
        app.use("/api/orders", orderRouter_1.default);
        app.use("/api/coupons", couponsRouter_1.default);
        app.use("/api/messages", messagesRouter_1.default);
        // Error handling middleware
        app.use(errors_1.notFound);
        app.use(errors_1.errorHandler);
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`🌍 Environment: ${process.env["NODE_ENV"]}`);
            console.log(`🔗 CORS enabled for: ${allowedOrigins.join(", ")}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};
// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("👋 SIGTERM received, shutting down gracefully");
    process.exit(0);
});
process.on("SIGINT", () => {
    console.log("👋 SIGINT received, shutting down gracefully");
    process.exit(0);
});
// Start the server
startServer();
//# sourceMappingURL=index.js.map