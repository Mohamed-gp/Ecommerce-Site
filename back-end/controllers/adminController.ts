import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { authRequest } from "../interfaces/authInterface";
import User from "../models/User";
import Product from "../models/Product";
import Comment from "../models/Comment";
import Category from "../models/Category";
import Order from "../models/Order";

const getAdmins = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    let admins: any = await User.find({ role: "admin" });
    admins.forEach((admin: any) => {
      admin.password = "";
    });

    return res
      .status(200)
      .json({ message: "fetched successfully", data: admins });
  } catch (error) {
    return next(error);
  }
};

const addAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.adminEmail;
    /// joi validation email

    let admin: any = await User.find({ email: email });
    if (admin.length == 0 || !admin) {
      return res
        .status(404)
        .json({ data: null, message: "no user found with this email" });
    } else if (admin?.role == "admin") {
      return res.status(400).json({
        data: null,
        message: "the user with this email is already admin",
      });
    } else {
      await User.findOneAndUpdate({ email: email }, { role: "admin" });
      return res.status(201).json({
        data: null,
        message: "the user with this email added to be admin successfully",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const deleteAdmin = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid user ID format",
      });
    }

    /// joi validation email
    let admin: any = await User.findById(id);
    if (!admin) {
      return res
        .status(404)
        .json({ data: null, message: "no user found with this id" });
    } else if (admin?.role == "user") {
      return res.status(404).json({
        data: null,
        message: "this user is not admin",
      });
    } else if (req?.user?.id == id) {
      return res
        .status(404)
        .json({ data: null, message: "admin can't remove himself" });
    } else {
      await User.findOneAndUpdate({ role: "admin" }, { role: "user" });
      return res
        .status(200)
        .json({ data: null, message: "admin deleted successfully" });
    }
  } catch (error) {
    return next(error);
  }
};

const getUsersCount = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersCount = await User.countDocuments();
    return res
      .status(200)
      .json({ data: usersCount, message: "fetched successfull" });
  } catch (error) {
    return next(error);
  }
};

const getProductsCount = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productsCount = await Product.countDocuments();
    return res
      .status(200)
      .json({ data: productsCount, message: "fetched successfull" });
  } catch (error) {
    return next(error);
  }
};

const getCategoriesCount = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoriesCount = await Category.countDocuments();
    return res
      .status(200)
      .json({ data: categoriesCount, message: "fetched successfull" });
  } catch (error) {
    return next(error);
  }
};

const getCommentsCount = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentsCount = await Comment.countDocuments();
    return res
      .status(200)
      .json({ data: commentsCount, message: "fetched successfull" });
  } catch (error) {
    return next(error);
  }
};

const getDashboardAnalytics = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get basic counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Get revenue data and calculate growth
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);

    const currentMonthOrders = await Order.find({
      createdAt: { $gte: lastMonth, $lt: today },
      status: "completed",
    });
    const previousMonthOrders = await Order.find({
      createdAt: { $gte: twoMonthsAgo, $lt: lastMonth },
      status: "completed",
    });

    const currentMonthRevenue = currentMonthOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const previousMonthRevenue = previousMonthOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const revenueGrowth = previousMonthRevenue
      ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) *
        100
      : 0;

    const ordersGrowth = previousMonthOrders.length
      ? ((currentMonthOrders.length - previousMonthOrders.length) /
          previousMonthOrders.length) *
        100
      : 0;

    // Get customer growth
    const currentMonthCustomers = await User.countDocuments({
      createdAt: { $gte: lastMonth, $lt: today },
    });
    const previousMonthCustomers = await User.countDocuments({
      createdAt: { $gte: twoMonthsAgo, $lt: lastMonth },
    });
    const customersGrowth = previousMonthCustomers
      ? ((currentMonthCustomers - previousMonthCustomers) /
          previousMonthCustomers) *
        100
      : 0;

    // Calculate average order value
    const averageOrderValue =
      totalOrders > 0 ? currentMonthRevenue / currentMonthOrders.length : 0;

    // Get monthly sales data for chart
    const currentYear = new Date().getFullYear();
    const salesData: Array<{ month: string; sales: number; orders: number }> =
      [];

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(currentYear, month, 1);
      const endDate = new Date(currentYear, month + 1, 0);

      const monthlyOrders = await Order.find({
        createdAt: { $gte: startDate, $lte: endDate },
        status: "completed",
      });

      const monthlyRevenue = monthlyOrders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
      );

      salesData.push({
        month: new Date(currentYear, month).toLocaleString("default", {
          month: "short",
        }),
        sales: monthlyRevenue,
        orders: monthlyOrders.length,
      });
    }

    // Get category distribution
    const categoryData = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          value: { $size: "$products" },
        },
      },
      {
        $sort: { value: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    const summaryStats = {
      totalRevenue: currentMonthRevenue,
      totalOrders,
      totalCustomers: totalUsers,
      averageOrderValue,
      revenueGrowth,
      ordersGrowth,
      customersGrowth,
    };

    return res.status(200).json({
      message: "Dashboard analytics fetched successfully",
      data: {
        summaryStats,
        salesData,
        categoryData,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID format",
        data: null,
      });
    }

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Must be 'user' or 'admin'",
        data: null,
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    user.role = role;
    await user.save();

    return res.status(200).json({
      message: `User role updated to ${role} successfully`,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID format",
        data: null,
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    // Don't allow deletion of admin users for safety
    if (user.role === "admin") {
      return res.status(403).json({
        message: "Cannot delete admin users",
        data: null,
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllComments = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find()
      .populate("user", "username email")
      .populate("product", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteCommentAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid comment ID format",
        data: null,
      });
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        data: null,
      });
    }

    await Comment.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Comment deleted successfully",
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @method GET
 * @route /api/admin/products
 * @access admin
 * @desc get all products for admin management
 */
const getAllProductsForAdmin = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return next(error);
  }
};

export {
  getAdmins,
  addAdmin,
  deleteAdmin,
  getUsersCount,
  getCategoriesCount,
  getProductsCount,
  getCommentsCount,
  getDashboardAnalytics,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllComments,
  deleteCommentAsAdmin,
  getAllProductsForAdmin,
};
