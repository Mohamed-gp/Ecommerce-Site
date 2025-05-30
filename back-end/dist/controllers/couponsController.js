"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCoupon = exports.deleteCoupon = exports.createCoupon = exports.getAllCoupons = void 0;
const Coupon_1 = __importDefault(require("../models/Coupon"));
// Get all coupons
const getAllCoupons = async (req, res, next) => {
    try {
        const coupons = await Coupon_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Coupons fetched successfully",
            data: coupons,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllCoupons = getAllCoupons;
// Create a new coupon
const createCoupon = async (req, res, next) => {
    try {
        const { code, discount, expiresAt } = req.body;
        // Check if coupon with same code exists
        const existingCoupon = await Coupon_1.default.findOne({ code: code.toUpperCase() });
        if (existingCoupon) {
            return res.status(400).json({
                message: "Coupon with this code already exists",
                data: null,
            });
        }
        const coupon = await Coupon_1.default.create({
            code: code.toUpperCase(),
            discount,
            expiresAt,
        });
        return res.status(201).json({
            message: "Coupon created successfully",
            data: coupon,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.createCoupon = createCoupon;
// Delete a coupon
const deleteCoupon = async (req, res, next) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon_1.default.findByIdAndDelete(id);
        if (!coupon) {
            return res.status(404).json({
                message: "Coupon not found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Coupon deleted successfully",
            data: null,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteCoupon = deleteCoupon;
// Validate a coupon
const validateCoupon = async (req, res, next) => {
    try {
        const { code } = req.body;
        const coupon = await Coupon_1.default.findOne({ code: code.toUpperCase() });
        if (!coupon) {
            return res.status(404).json({
                message: "Invalid coupon code",
                data: null,
            });
        }
        // Check if coupon is expired
        if (new Date() > new Date(coupon.expiresAt)) {
            return res.status(400).json({
                message: "Coupon has expired",
                data: null,
            });
        }
        // Check if coupon is active
        if (!coupon.isActive) {
            return res.status(400).json({
                message: "Coupon is no longer active",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Coupon is valid",
            data: coupon,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.validateCoupon = validateCoupon;
//# sourceMappingURL=couponsController.js.map