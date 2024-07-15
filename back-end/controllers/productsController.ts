import cloudinary from "../config/cloudinary";
import { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product";
import multer from "multer";
import removeFiles from "../utils/fs/cleanUpload";
import { verifyCreateProduct } from "../utils/joi/productValidation";

/**
 *
 * @method GET
 * @route /api/products?query
 * @access public
 * @desc get products
 *
 */
const getAllProducts = async (req: Request, res: Response) => {
  let { search, category } = req.query;
  console.log(category);
  if (search && search != "") {
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    });
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
    if (typeof(category) == "string") {
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

  const products = await Product.find();
  return res
    .status(200)
    .json({ message: "fetched successfully", data: products });
};
/**
 *
 * @method GET
 * @route /api/products/:id
 * @access public
 * @desc get products
 *
 */
const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate("category");
  console.log(product);
  if (!product) {
    return res.status(404).json({ data: null, message: "product not found" });
  }

  return res
    .status(200)
    .json({ message: "fetched successfully", data: product });
};

const createProduct = async (req: Request, res: Response) => {
  removeFiles();
  const { error } = verifyCreateProduct(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, data: null });
  }
  const files = req.files as Express.Multer.File[];
  if (files.length != 4) {
    return res
      .status(400)
      .json({ message: "you must enter 4 images of the product", data: null });
  }
  const pictures = files?.map((file) => {
    return file.path;
  });
  const uploadedPictures = await Promise.all(
    pictures.map((picture) => cloudinary.uploader.upload(picture))
  );
  const pictureUrls = uploadedPictures.map((picture) => picture.url);
  console.log(pictureUrls);
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
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

const getFeaturedProducts = async (req: Request, res: Response) => {
  const products = await Product.find({ isFeatured: true });
  return res
    .status(200)
    .json({ message: "fetched successfully", data: products });
};

export {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  getFeaturedProducts,
};
