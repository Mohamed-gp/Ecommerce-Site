"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const verifyToken_1 = require("../middlewares/verifyToken");
const verifyObjectId_1 = __importDefault(require("../middlewares/verifyObjectId"));
const router = express_1.default.Router();
// Public routes
router.post("/", orderController_1.createOrder);
// Admin routes (must come before parameterized routes)
router.get("/stats/revenue", verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, orderController_1.getRevenueStats);
router.get("/stats", verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, orderController_1.getOrderStats);
router.get("/admin", verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, orderController_1.getAllOrders);
// Protected routes
router.get("/user/:userId", verifyToken_1.verifyToken, orderController_1.getUserOrders);
router.get("/:orderId", verifyToken_1.verifyToken, verifyObjectId_1.default, orderController_1.getOrderById);
router.patch("/:orderId/status", verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, verifyObjectId_1.default, orderController_1.updateOrderStatus);
exports.default = router;
//# sourceMappingURL=orderRouter.js.map