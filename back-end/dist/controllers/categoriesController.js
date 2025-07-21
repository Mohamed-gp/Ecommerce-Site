"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.createCategory = exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
// import asyncHandler from "express-async-handler"
/**
 *
 * @method GET
 * @route /api/categories
 * @access public
 * @desc get products
 *
 */
const getAllCategories = async (_req, res, next) => {
    try {
        const categories = await Category_1.default.find();
        return res
            .status(200)
            .json({ message: "fetched successfully", data: categories });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllCategories = getAllCategories;
/**
 *
 * @method POST
 * @route /api/categories
 * @access Private
 * @desc get products
 *
 */
const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name || name?.length < 7) {
            return res.status(400).json({
                data: null,
                message: "you must enter a category title with lenght more than 7",
            });
        }
        let category = await Category_1.default.findOne({
            name: name,
        });
        if (category) {
            return res.status(400).json({ message: "this category already exist" });
        }
        category = await Category_1.default.create({
            name,
        });
        return res
            .status(201)
            .json({ data: category, message: "category created successfull" });
    }
    catch (error) {
        return next(error);
    }
};
exports.createCategory = createCategory;
/**
 *
 * @method delete
 * @route /api/categories/:id
 * @access public
 * @desc get products
 *
 */
const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category_1.default.findById(req.params.id);
        if (!category) {
            return res
                .status(400)
                .json({ data: null, message: "this category not found" });
        }
        await Category_1.default.findByIdAndDelete(req.params.id);
        return res
            .status(200)
            .json({ message: "category deleted successfully", data: null });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoriesController.js.map