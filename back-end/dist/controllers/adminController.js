"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsForAdmin = exports.deleteCommentAsAdmin = exports.getAllComments = exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.getDashboardAnalytics = exports.getCommentsCount = exports.getProductsCount = exports.getCategoriesCount = exports.getUsersCount = exports.deleteAdmin = exports.addAdmin = exports.getAdmins = void 0;
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const Comment_1 = __importDefault(require("../models/Comment"));
const Category_1 = __importDefault(require("../models/Category"));
const Order_1 = __importDefault(require("../models/Order"));
const getAdmins = async (_req, res, next) => {
    try {
        let admins = await User_1.default.find({ role: "admin" });
        admins.forEach((admin) => {
            admin.password = "";
        });
        return res
            .status(200)
            .json({ message: "fetched successfully", data: admins });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAdmins = getAdmins;
const addAdmin = async (req, res, next) => {
    try {
        const email = req.body.adminEmail;
        /// joi validation email
        let admin = await User_1.default.find({ email: email });
        if (admin.length == 0 || !admin) {
            return res
                .status(404)
                .json({ data: null, message: "no user found with this email" });
        }
        else if (admin?.role == "admin") {
            return res.status(400).json({
                data: null,
                message: "the user with this email is already admin",
            });
        }
        else {
            await User_1.default.findOneAndUpdate({ email: email }, { role: "admin" });
            return res.status(201).json({
                data: null,
                message: "the user with this email added to be admin successfully",
            });
        }
    }
    catch (error) {
        return next(error);
    }
};
exports.addAdmin = addAdmin;
const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        /// joi validation email
        let admin = await User_1.default.findById(id);
        if (!admin) {
            return res
                .status(404)
                .json({ data: null, message: "no user found with this id" });
        }
        else if (admin?.role == "user") {
            return res.status(404).json({
                data: null,
                message: "this user is not admin",
            });
        }
        else if (req?.user?.id == id) {
            return res
                .status(404)
                .json({ data: null, message: "admin can't remove himself" });
        }
        else {
            await User_1.default.findOneAndUpdate({ role: "admin" }, { role: "user" });
            return res
                .status(200)
                .json({ data: null, message: "admin deleted successfully" });
        }
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteAdmin = deleteAdmin;
const getUsersCount = async (_req, res, next) => {
    try {
        const usersCount = await User_1.default.countDocuments();
        return res
            .status(200)
            .json({ data: usersCount, message: "fetched successfull" });
    }
    catch (error) {
        return next(error);
    }
};
exports.getUsersCount = getUsersCount;
const getProductsCount = async (_req, res, next) => {
    try {
        const productsCount = await Product_1.default.countDocuments();
        return res
            .status(200)
            .json({ data: productsCount, message: "fetched successfull" });
    }
    catch (error) {
        return next(error);
    }
};
exports.getProductsCount = getProductsCount;
const getCategoriesCount = async (_req, res, next) => {
    try {
        const categoriesCount = await Category_1.default.countDocuments();
        return res
            .status(200)
            .json({ data: categoriesCount, message: "fetched successfull" });
    }
    catch (error) {
        return next(error);
    }
};
exports.getCategoriesCount = getCategoriesCount;
const getCommentsCount = async (_req, res, next) => {
    try {
        const commentsCount = await Comment_1.default.countDocuments();
        return res
            .status(200)
            .json({ data: commentsCount, message: "fetched successfull" });
    }
    catch (error) {
        return next(error);
    }
};
exports.getCommentsCount = getCommentsCount;
const getDashboardAnalytics = async (_req, res, next) => {
    try {
        // Get basic counts
        const totalUsers = await User_1.default.countDocuments();
        const totalProducts = await Product_1.default.countDocuments();
        const totalCategories = await Category_1.default.countDocuments();
        const totalOrders = await Order_1.default.countDocuments();
        // Get revenue data and calculate growth
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        const currentMonthOrders = await Order_1.default.find({
            createdAt: { $gte: lastMonth, $lt: today },
            status: "completed",
        });
        const previousMonthOrders = await Order_1.default.find({
            createdAt: { $gte: twoMonthsAgo, $lt: lastMonth },
            status: "completed",
        });
        const currentMonthRevenue = currentMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const previousMonthRevenue = previousMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
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
        const currentMonthCustomers = await User_1.default.countDocuments({
            createdAt: { $gte: lastMonth, $lt: today },
        });
        const previousMonthCustomers = await User_1.default.countDocuments({
            createdAt: { $gte: twoMonthsAgo, $lt: lastMonth },
        });
        const customersGrowth = previousMonthCustomers
            ? ((currentMonthCustomers - previousMonthCustomers) /
                previousMonthCustomers) *
                100
            : 0;
        // Calculate average order value
        const averageOrderValue = totalOrders > 0 ? currentMonthRevenue / currentMonthOrders.length : 0;
        // Get monthly sales data for chart
        const currentYear = new Date().getFullYear();
        const salesData = [];
        for (let month = 0; month < 12; month++) {
            const startDate = new Date(currentYear, month, 1);
            const endDate = new Date(currentYear, month + 1, 0);
            const monthlyOrders = await Order_1.default.find({
                createdAt: { $gte: startDate, $lte: endDate },
                status: "completed",
            });
            const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.totalAmount, 0);
            salesData.push({
                month: new Date(currentYear, month).toLocaleString("default", {
                    month: "short",
                }),
                sales: monthlyRevenue,
                orders: monthlyOrders.length,
            });
        }
        // Get category distribution
        const categoryData = await Category_1.default.aggregate([
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
    }
    catch (error) {
        return next(error);
    }
};
exports.getDashboardAnalytics = getDashboardAnalytics;
const getAllUsers = async (_req, res, next) => {
    try {
        const users = await User_1.default.find().select("-password").sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllUsers = getAllUsers;
const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role. Must be 'user' or 'admin'",
                data: null,
            });
        }
        const user = await User_1.default.findById(id);
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
    }
    catch (error) {
        return next(error);
    }
};
exports.updateUserRole = updateUserRole;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id);
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
        await User_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "User deleted successfully",
            data: null,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteUser = deleteUser;
const getAllComments = async (_req, res, next) => {
    try {
        const comments = await Comment_1.default.find()
            .populate("user", "username email")
            .populate("product", "name")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Comments fetched successfully",
            data: comments,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllComments = getAllComments;
const deleteCommentAsAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment_1.default.findById(id);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                data: null,
            });
        }
        await Comment_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Comment deleted successfully",
            data: null,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteCommentAsAdmin = deleteCommentAsAdmin;
/**
 * @method GET
 * @route /api/admin/products
 * @access admin
 * @desc get all products for admin management
 */
const getAllProductsForAdmin = async (_req, res, next) => {
    try {
        const products = await Product_1.default.find()
            .populate("category", "name")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Products fetched successfully",
            data: products,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllProductsForAdmin = getAllProductsForAdmin;
//# sourceMappingURL=adminController.js.map