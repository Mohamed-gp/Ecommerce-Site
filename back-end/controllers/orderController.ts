import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import User from "../models/User";
import Cart from "../models/Cart";
import { Types } from "mongoose";

// Create a new order after successful payment
const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { userId, items, totalAmount, paymentId, shippingAddress } = req.body;

    const order = await Order.build({
      user: new Types.ObjectId(userId),
      items,
      totalAmount,
      paymentId,
      shippingAddress,
      status: "processing",
      paymentMethod: "stripe", // Default payment method
    }).save();

    // Clear the user's cart after successful order
    await Cart.deleteMany({
      user: new Types.ObjectId(userId),
    }).exec();

    await User.findByIdAndUpdate(
      new Types.ObjectId(userId),
      { $set: { cart: [] } },
      { new: true }
    ).exec();

    return res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

// Get all orders for admin
const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { status } = req.query;
    const query: Record<string, unknown> = {};

    if (status) {
      query["status"] = status;
    }

    const orders = await Order.find(query)
      .populate("user", "username email")
      .populate("items.product")
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};

// Get orders for a specific user
const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({
      user: new Types.ObjectId(userId),
    })
      .populate("items.product")
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      message: "User orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};

// Get order by ID
const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const orderId = req.params["orderId"];

    const order = await Order.findById(new Types.ObjectId(orderId))
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
  } catch (error) {
    return next(error);
  }
};

// Update order status
const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!isValidOrderStatus(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        data: null,
      });
    }

    const order = await Order.findByIdAndUpdate(
      new Types.ObjectId(orderId),
      { status },
      { new: true }
    ).exec();

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
    return next(error);
  }
};

// Get revenue statistics
const getRevenueStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

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
  } catch (error) {
    return next(error);
  }
};

// Get order statistics
const getOrderStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
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
  } catch (error) {
    return next(error);
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
    if (order._id && order._id in stats.status) {
      stats.status[order._id as keyof typeof stats.status] = order.count;
    }
  });

  return stats;
};

// Type guard for order status
function isValidOrderStatus(
  status: unknown
): status is "pending" | "processing" | "shipped" | "delivered" | "canceled" {
  return (
    typeof status === "string" &&
    ["pending", "processing", "delivered", "shipped", "canceled"].includes(
      status
    )
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
