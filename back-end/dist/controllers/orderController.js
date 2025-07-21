"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStats = exports.getRevenueStats = exports.updateOrderStatus = exports.getOrderById = exports.getUserOrders = exports.getAllOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const User_1 = __importDefault(require("../models/User"));
const Cart_1 = __importDefault(require("../models/Cart"));
const mongoose_1 = require("mongoose");
// Create a new order after successful payment
const createOrder = async (req, res, next) => {
    try {
        const { userId, items, totalAmount, paymentId, shippingAddress } = req.body;
        const order = await Order_1.default.build({
            user: new mongoose_1.Types.ObjectId(userId),
            items,
            totalAmount,
            paymentId,
            shippingAddress,
            status: "processing",
            paymentMethod: "stripe", // Default payment method
        }).save();
        // Clear the user's cart after successful order
        await Cart_1.default.deleteMany({
            user: new mongoose_1.Types.ObjectId(userId),
        }).exec();
        await User_1.default.findByIdAndUpdate(new mongoose_1.Types.ObjectId(userId), { $set: { cart: [] } }, { new: true }).exec();
        return res.status(201).json({
            message: "Order created successfully",
            data: order,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.createOrder = createOrder;
// Get all orders for admin
const getAllOrders = async (req, res, next) => {
    try {
        const { status } = req.query;
        const query = {};
        if (status) {
            query["status"] = status;
        }
        const orders = await Order_1.default.find(query)
            .populate("user", "username email")
            .populate("items.product")
            .sort({ createdAt: -1 })
            .exec();
        return res.status(200).json({
            message: "Orders fetched successfully",
            data: orders,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllOrders = getAllOrders;
// Get orders for a specific user
const getUserOrders = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const orders = await Order_1.default.find({
            user: new mongoose_1.Types.ObjectId(userId),
        })
            .populate("items.product")
            .sort({ createdAt: -1 })
            .exec();
        return res.status(200).json({
            message: "User orders fetched successfully",
            data: orders,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getUserOrders = getUserOrders;
// Get order by ID
const getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params["orderId"];
        const order = await Order_1.default.findById(new mongoose_1.Types.ObjectId(orderId))
            .populate("user", "username email")
            .populate("items.product")
            .exec();
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Order fetched successfully",
            data: order,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getOrderById = getOrderById;
// Update order status
const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        if (!isValidOrderStatus(status)) {
            return res.status(400).json({
                message: "Invalid status value",
                data: null,
            });
        }
        const order = await Order_1.default.findByIdAndUpdate(new mongoose_1.Types.ObjectId(orderId), { status }, { new: true }).exec();
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Order status updated successfully",
            data: order,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.updateOrderStatus = updateOrderStatus;
// Get revenue statistics
const getRevenueStats = async (_req, res, next) => {
    try {
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const endOfToday = new Date(today.setHours(23, 59, 59, 999));
        const todayRevenue = await Order_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfToday, $lte: endOfToday },
                    status: { $ne: "canceled" },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                    orderCount: { $sum: 1 },
                },
            },
        ]);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
        const monthRevenue = await Order_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
                    status: { $ne: "canceled" },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                    orderCount: { $sum: 1 },
                },
            },
        ]);
        const totalRevenue = await Order_1.default.aggregate([
            {
                $match: {
                    status: { $ne: "canceled" },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                    orderCount: { $sum: 1 },
                },
            },
        ]);
        return res.status(200).json({
            message: "Revenue statistics fetched successfully",
            data: {
                today: {
                    revenue: todayRevenue[0]?.totalRevenue || 0,
                    orders: todayRevenue[0]?.orderCount || 0,
                },
                month: {
                    revenue: monthRevenue[0]?.totalRevenue || 0,
                    orders: monthRevenue[0]?.orderCount || 0,
                },
                total: {
                    revenue: totalRevenue[0]?.totalRevenue || 0,
                    orders: totalRevenue[0]?.orderCount || 0,
                },
            },
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getRevenueStats = getRevenueStats;
// Get order statistics
const getOrderStats = async (_req, res, next) => {
    try {
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const endOfToday = new Date(today.setHours(23, 59, 59, 999));
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const todayStats = await getOrderStatsForPeriod(startOfToday, endOfToday);
        const weekStats = await getOrderStatsForPeriod(startOfWeek, endOfToday);
        const monthStats = await getOrderStatsForPeriod(startOfMonth, endOfToday);
        return res.status(200).json({
            message: "Order statistics fetched successfully",
            data: {
                today: todayStats,
                week: weekStats,
                month: monthStats,
            },
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getOrderStats = getOrderStats;
const getOrderStatsForPeriod = async (startDate, endDate) => {
    const orders = await Order_1.default.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        },
    ]);
    const stats = {
        count: 0,
        status: {
            pending: 0,
            processing: 0,
            delivered: 0,
            shipped: 0,
            canceled: 0,
        },
    };
    orders.forEach((order) => {
        stats.count += order.count;
        if (order._id && order._id in stats.status) {
            stats.status[order._id] = order.count;
        }
    });
    return stats;
};
// Type guard for order status
function isValidOrderStatus(status) {
    return (typeof status === "string" &&
        ["pending", "processing", "delivered", "shipped", "canceled"].includes(status));
}
//# sourceMappingURL=orderController.js.map