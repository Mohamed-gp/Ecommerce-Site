import { Request, Response } from "express";
import Category from "../models/Category";
import asyncHandler from "express-async-handler"

/**
 *
 * @method GET
 * @route /api/categories
 * @access public
 * @desc get products
 *
 */
const getAllCategories = async (req: Request, res: Response) => {
  const categories = await Category.find();
  return res
    .status(200)
    .json({ message: "fetched successfully", data: categories });
};

/**
 *
 * @method POST
 * @route /api/categories
 * @access Private
 * @desc get products
 *
 */
const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ data: null, message: "you must enter a category title " });
  }
  let category = await Category.find({
    name,
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
};

/**
 *
 * @method GET
 * @route /api/categories/:id
 * @access public
 * @desc get products
 *
 */

const deleteCategory = async (req: Request, res: Response) => {
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
};
