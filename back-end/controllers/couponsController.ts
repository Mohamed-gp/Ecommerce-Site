import { Request, Response, NextFunction } from "express";
import Coupon from "../models/Coupon";

// Get all coupons
const getAllCoupons = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Coupons fetched successfully",
      data: coupons,
    });
  } catch (error) {
    return next(error);
  }
};

// Create a new coupon
const createCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { code, discount, expiresAt } = req.body;

    // Check if coupon with same code exists
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({
        message: "Coupon with this code already exists",
        data: null,
      });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discount,
      expiresAt,
    });

    return res.status(201).json({
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete a coupon
const deleteCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
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
  } catch (error) {
    return next(error);
  }
};

// Validate a coupon
const validateCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

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
  } catch (error) {
    return next(error);
  }
};

export { getAllCoupons, createCoupon, deleteCoupon, validateCoupon };
