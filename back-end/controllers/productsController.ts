import cloudinary from "../config/cloudinary";
import { NextFunction, Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";
import multer from "multer";
import removeFiles from "../utils/fs/cleanUpload";
import { verifyCreateProduct } from "../utils/joi/productValidation";
import { authRequest } from "../interfaces/authInterface";

/**
 *
 * @method GET
 * @route /api/products?query
 * @access public
 * @desc get products
 *
 */
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { search, category, newArrivals } = req.query;
    if (search && search != "") {
      const products = await Product.find({
        name: { $regex: search, $options: "i" },
      }).populate("category");
      return res.status(200).json({
        message: "fetched Successfully",
        data: products,
      });
    }
    if (newArrivals == "true") {
      const products = await Product.find()
        .sort({ createdAt: -1 })
        .populate("category");
      return res.status(200).json({
        message: "fetched Successfully",
        data: products,
      });
    }
    if (category && category != "") {
      // const products = await Product.aggregate([
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "category",
      //       foreignField: "_id",
      //       as: "categoryInfo",
      //     },
      //   },
      //   {
      //     $unwind: "$categoryInfo",
      //   },
      //   {
      //     $match: {
      //       "categoryInfo.name": category,
      //     },
      //   },
      // ]);
      if (typeof category == "string") {
        category = category.replace("+", " ");
      }
      const products = await Product.find({}).populate("category");
      const filteredProducts = products.filter(
        (product) => product.category.name == category
      );
      return res.status(200).json({
        message: "fetched Successfully",
        data: filteredProducts,
      });
    }

    const products = await Product.find().populate("category");
    return res
      .status(200)
      .json({ message: "fetched successfully", data: products });
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @method GET
 * @route /api/products/:id
 * @access public
 * @desc get products
 *
 */
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ data: null, message: "product not found" });
    }

    return res
      .status(200)
      .json({ message: "fetched successfully", data: product });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    removeFiles();
    const { error } = verifyCreateProduct(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details[0].message, data: null });
    }
    const files = req.files as Express.Multer.File[];
    if (files.length != 4) {
      return res.status(400).json({
        message: "you must enter 4 images of the product",
        data: null,
      });
    }
    const pictures = files?.map((file) => {
      return file.path;
    });
    const uploadedPictures = await Promise.all(
      pictures.map((picture) => cloudinary.uploader.upload(picture))
    );
    const pictureUrls = uploadedPictures.map((picture) => picture.url);
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: +req.body.price,
      promoPercentage: +req.body.promotionPercentage,
      category: req.body.category,
      isFeatured: req.body.isFeatured,
      images: pictureUrls,
    });
    return res
      .status(201)
      .json({ message: "created successfully", data: product });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ data: null, message: "no product find with this id" });
    } else {
      await Product.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ data: null, message: "deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const getFeaturedProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({ isFeatured: true });
    return res
      .status(200)
      .json({ message: "fetched successfully", data: products });
  } catch (error) {
    next(error);
  }
};

const toggleWishlist = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId } = req.body;
  try {
    if (userId !== req.user.id) {
      return res.status(403).json({
        data: null,
        message: "Access denied, you must be the user himself",
      });
    }
    let user = await User.findById(userId).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isExist = user.wishlist.find((ele: any) => productId == ele._id);
    if (isExist) {
      user.wishlist = user.wishlist.filter((ele: any) => ele._id != productId);
    } else {
      user.wishlist.push(productId);
    }
    await user.save();
    user = await User.findById(userId).populate("wishlist");
    return res
      .status(200)
      .json({ message: "wishlist toggled successfull", data: user.wishlist });
  } catch (error) {
    next(error);
  }
};

export {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  getFeaturedProducts,
  toggleWishlist,
};
