import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getRevenueStats,
  getOrderStats,
} from "../controllers/orderController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
import verifyObjectId from "../middlewares/verifyObjectId";

const router = express.Router();

// Public routes
router.post("/", createOrder);

// Admin routes (must come before parameterized routes)
router.get("/stats/revenue", verifyToken, verifyAdmin, getRevenueStats);
router.get("/stats", verifyToken, verifyAdmin, getOrderStats);
router.get("/admin", verifyToken, verifyAdmin, getAllOrders);

// Protected routes
router.get("/user/:userId", verifyToken, getUserOrders);
router.get("/:orderId", verifyToken, verifyObjectId, getOrderById);
router.patch(
  "/:orderId/status",
  verifyToken,
  verifyAdmin,
  verifyObjectId,
  updateOrderStatus
);

export default router;
