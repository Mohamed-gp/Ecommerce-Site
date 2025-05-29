import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getRevenueStats,
} from "../controllers/orderController";
import { verifyToken } from "../middlewares/verifyToken";
import verifyObjectId from "../middlewares/verifyObjectId";

const router = express.Router();

// Public routes
router.post("/", createOrder);

// Protected routes
router.get("/user/:userId", verifyToken, getUserOrders);
router.get("/:orderId", verifyToken, verifyObjectId, getOrderById);

// Admin routes
router.get("/", verifyToken, getAllOrders);
router.patch(
  "/:orderId/status",
  verifyToken,
  verifyObjectId,
  updateOrderStatus
);
router.get("/stats/revenue", verifyToken, getRevenueStats);

export default router;
