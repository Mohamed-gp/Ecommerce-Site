import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import User from "../models/User";
import Cart from "../models/Cart";
import Product from "../models/Product";

type OrderStatus = "pending" | "processing" | "delivered";

interface OrderStatusCounts {
  pending: number;
  processing: number;
  delivered: number;
  [key: string]: number; // Allow string indexing
}

interface OrderStats {
  count: number;
  status: OrderStatusCounts;
}

interface OrderStatusCount {
  _id: "pending" | "processing" | "delivered" | "shipped" | "canceled";
  count: number;
}

interface AggregatedOrder {
  _id: string;
  count: number;
}

// Create a new order after successful payment
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, items, totalAmount, paymentId, shippingAddress } = req.body;

    // Create the order
    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      paymentId,
      shippingAddress,
      status: "processing",
    });

    // Clear the user's cart after successful order
    await Cart.deleteMany({ user: userId });

    // Update the user's cart reference
    await User.findByIdAndUpdate(userId, { $set: { cart: [] } });

    return res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Get all orders for admin
const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    // Build query based on filters
    const query: any = {};
    if (status) {
      query.status = status;
    }

    // Count total orders matching the query
    const totalOrders = await Order.countDocuments(query);

    // Fetch orders with pagination
    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    return res.status(200).json({
      message: "Orders fetched successfully",
      data: {
        orders,
        totalOrders,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalOrders / limitNumber),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get orders for a specific user
const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "User orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// Get order by ID
const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .populate("items.product");

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
  } catch (error) {
    next(error);
  }
};

// Update order status
const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "canceled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        data: null,
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

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
  } catch (error) {
    next(error);
  }
};

// Get revenue statistics
const getRevenueStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    // Get today's revenue
    const todayRevenue = await Order.aggregate([
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

    // Get current month revenue
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const monthRevenue = await Order.aggregate([
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

    // Get total revenue
    const totalRevenue = await Order.aggregate([
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
          revenue: todayRevenue.length > 0 ? todayRevenue[0].totalRevenue : 0,
          orders: todayRevenue.length > 0 ? todayRevenue[0].orderCount : 0,
        },
        month: {
          revenue: monthRevenue.length > 0 ? monthRevenue[0].totalRevenue : 0,
          orders: monthRevenue.length > 0 ? monthRevenue[0].orderCount : 0,
        },
        total: {
          revenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0,
          orders: totalRevenue.length > 0 ? totalRevenue[0].orderCount : 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get order statistics
const getOrderStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Get orders for different time periods with status breakdown
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
  } catch (error) {
    next(error);
  }
};

const getOrderStatsForPeriod = async (startDate: Date, endDate: Date) => {
  const orders = await Order.aggregate([
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
    if (
      order._id &&
      typeof order._id === "string" &&
      order._id in stats.status
    ) {
      stats.status[order._id as keyof typeof stats.status] = order.count;
    }
  });

  return stats;
};

function isValidOrderStatus(
  status: any
): status is "pending" | "processing" | "delivered" | "shipped" | "canceled" {
  return ["pending", "processing", "delivered", "shipped", "canceled"].includes(
    status
  );
}

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getRevenueStats,
  getOrderStats,
};
