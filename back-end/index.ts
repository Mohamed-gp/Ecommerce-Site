import express, { Request, Response } from "express";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/usersRouter";
import productsRouter from "./routes/productsRouter";
import categoriesRouter from "./routes/categoriesRouter";
import adminRouter from "./routes/adminRouter";
import orderRouter from "./routes/orderRouter";
import messagesRouter from "./routes/messagesRouter";
import connectToDB from "./lib/connectToDB";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/errors";
import cookieParser from "cookie-parser";
import cartRouter from "./routes/cartRouter";
import checkoutRouter from "./routes/checkoutRouter";
import commentsRouter from "./routes/commentsRouter";
import couponsRouter from "./routes/couponsRouter";

dotenv.config();

const startServer = async () => {
  try {
    // Connect to database first
    await connectToDB();

    const app = express();
    const PORT = (process.env["PORT"] as string) || 3000;

    // Trust proxy for deployment
    app.set("trust proxy", true);

    // Middleware
    app.use(cookieParser());
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: false, limit: "10mb" }));

    // Enhanced CORS configuration for production
    const allowedOrigins = [
      "http://localhost:5000", // Development
      "http://localhost:5173", // Vite dev server
      "https://swiftbuy.production-server.tech", // Production frontend
      "https://swiftbuy1.production-server.tech", // Production backend (for health checks)
    ];

    app.use(
      cors({
        origin: (origin, callback) => {
          // Allow requests with no origin (mobile apps, etc.)
          if (!origin) return callback(null, true);

          if (allowedOrigins.includes(origin)) {
            return callback(null, true);
          } else {
            return callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        exposedHeaders: ["Content-Range", "X-Content-Range"],
      })
    );

    // Health check endpoint
    app.get("/health", (_req: Request, res: Response) => {
      res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: process.env["NODE_ENV"],
        uptime: process.uptime(),
      });
    });

    // Routes
    app.get("/", (_req: Request, res: Response) => {
      res.json({
        message: "SwiftBuy E-commerce API",
        version: "1.0.0",
        environment: process.env["NODE_ENV"],
        status: "running",
      });
    });

    app.use("/api/auth", authRouter);
    app.use("/api/users", userRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/categories", categoriesRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/admin", adminRouter);
    app.use("/api/checkout", checkoutRouter);
    app.use("/api/comments", commentsRouter);
    app.use("/api/orders", orderRouter);
    app.use("/api/coupons", couponsRouter);
    app.use("/api/messages", messagesRouter);

    // Error handling middleware
    app.use(notFound);
    app.use(errorHandler);

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env["NODE_ENV"]}`);
      console.log(`🔗 CORS enabled for: ${allowedOrigins.join(", ")}`);
    });
  } catch (error) {
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
