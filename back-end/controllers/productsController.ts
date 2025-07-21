import cloudinary from "../config/cloudinary";
import { NextFunction, Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";
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
): Promise<Response | void> => {
  try {
    let { search, category, newArrivals } = req.query;
    if (search && search != "") {
      const products = await Product.find({
        name: { $regex: search, $options: "i" },
      })
        .populate("category")
        .exec();
      return res.status(200).json({
        message: "fetched Successfully",
        data: products,
      });
    }
    if (newArrivals == "true") {
      const products = await Product.find()
        .sort({ createdAt: -1 })
        .populate("category")
        .exec();
      return res.status(200).json({
        message: "fetched Successfully",
        data: products,
      });
    }
    if (category && category != "") {
      if (typeof category == "string") {
        category = category.replace("+", " ");
      }
      const products = await Product.find().populate("category").exec();
      const filteredProducts = products.filter(
        (product: any) => product.category?.name == category
      );
      return res.status(200).json({
        message: "fetched Successfully",
        data: filteredProducts,
      });
    }

    const products = await Product.find().populate("category").exec();
    return res
      .status(200)
      .json({ message: "fetched successfully", data: products });
  } catch (error) {
    return next(error);
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
const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const product = await Product.findById(req.params["id"])
      .populate("category")
      .exec();
    if (!product) {
      return res.status(404).json({ data: null, message: "product not found" });
    }

    return res
      .status(200)
      .json({ message: "fetched successfully", data: product });
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    removeFiles();
    const { error } = verifyCreateProduct(req.body);
    if (error && error.details && error.details[0]) {
      return res
        .status(400)
        .json({ message: error.details[0].message, data: null });
    }
    const files = req.files as any[];
    if (files.length < 1) {
      return res.status(400).json({
        message: "you must upload at least one image of the product",
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

    const product = Product.build({
      name: req.body.name,
      description: req.body.description,
      price: +req.body.price,
      promoPercentage: +req.body.promotionPercentage,
      category: req.body.category,
      isFeatured: req.body.isFeatured,
      images: pictureUrls,
    });
    await product.save();

    return res
      .status(201)
      .json({ message: "created successfully", data: product });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const product = await Product.findById(req.params["id"]).exec();
    if (!product) {
      return res
        .status(404)
        .json({ data: null, message: "no product find with this id" });
    } else {
      await Product.findByIdAndDelete(req.params["id"]);
      return res
        .status(200)
        .json({ data: null, message: "deleted successfully" });
    }
  } catch (error) {
    return next(error);
  }
};

const getFeaturedProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const products = await Product.find({ isFeatured: true }).exec();
    return res
      .status(200)
      .json({ message: "fetched successfully", data: products });
  } catch (error) {
    return next(error);
  }
};

/**
 * @method GET
 * @route /api/products/new-arrivals
 * @access public
 * @desc get new arrival products (latest 8 products)
 */
const getNewArrivals = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("category")
      .exec();

    return res.status(200).json({
      message: "New arrivals fetched successfully",
      data: products,
    });
  } catch (error) {
    return next(error);
  }
};

const toggleWishlist = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId, productId } = req.body;
  try {
    if (!req.user || userId !== req.user.id) {
      return res.status(403).json({
        data: null,
        message: "Access denied, you must be the user himself",
      });
    }
    let user = await User.findById(userId).populate("wishlist").exec();
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
    user = await User.findById(userId).populate("wishlist").exec();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res
      .status(200)
      .json({ message: "wishlist toggled successfull", data: user.wishlist });
  } catch (error) {
    return next(error);
  }
};

export {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  getFeaturedProducts,
  toggleWishlist,
  getNewArrivals,
};
