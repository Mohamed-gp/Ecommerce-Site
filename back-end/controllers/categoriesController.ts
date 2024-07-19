import { NextFunction, Request, Response } from "express";
import Category from "../models/Category";
// import asyncHandler from "express-async-handler"

/**
 *
 * @method GET
 * @route /api/categories
 * @access public
 * @desc get products
 *
 */
const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    return res
      .status(200)
      .json({ message: "fetched successfully", data: categories });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @method POST
 * @route /api/categories
 * @access Private
 * @desc get products
 *
 */
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name || name?.length < 7) {
      return res.status(400).json({
        data: null,
        message: "you must enter a category title with lenght more than 7",
      });
    }
    let category = await Category.findOne({
      name: name,
    });
    if (category) {
      return res.status(400).json({ message: "this category already exist" });
    }
    category = await Category.create({
      name,
    });
    return res
      .status(201)
      .json({ data: category, message: "category created successfull" });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @method delete
 * @route /api/categories/:id
 * @access public
 * @desc get products
 *
 */

const deleteCategory = async (req: Request, res: Response,next : NextFunction) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(400)
        .json({ data: null, message: "this category not found" });
    }
    await Category.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "category deleted successfully", data: null });
  } catch (error) {
    next(error);
  }
};

export { getAllCategories, createCategory, deleteCategory };
