import { Request, Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
import User from "../models/User";
import Product from "../models/Product";
import Comment from "../models/Comment";
import Category from "../models/Category";

const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
  let admins: any = await User.find({ role: "admin" });
  admins.forEach((admin: any) => {
    admin.password = "";
  });

  return res
    .status(200)
    .json({ message: "fetched successfully", data: admins });
};
const addAdmin = async (req: Request, res: Response, next: NextFunction) => {
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
};

const deleteAdmin = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
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
};

const getUsersCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersCount = await User.find().countDocuments();
    return res
      .status(200)
      .json({ data: usersCount, message: "fetched successfull" });
  } catch (error) {
    next(error);
  }
};
const getProductsCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productsCount = await Product.find().countDocuments();
    return res
      .status(200)
      .json({ data: productsCount, message: "fetched successfull" });
  } catch (error) {
    next(error);
  }
};
const getCategoriesCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoriesCount = await Category.find().countDocuments();
    return res
      .status(200)
      .json({ data: categoriesCount, message: "fetched successfull" });
  } catch (error) {
    next(error);
  }
};
const getCommentsCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentsCount = await Comment.find().countDocuments();
    return res
      .status(200)
      .json({ data: commentsCount, message: "fetched successfull" });
  } catch (error) {
    next(error);
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
};
