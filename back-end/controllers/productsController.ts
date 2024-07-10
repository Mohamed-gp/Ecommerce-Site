import { Request, Response } from "express";
import { Product } from "../models/Product";

/**
 *
 * @method GET
 * @route /api/products
 * @access public
 * @desc get products
 *
 */
const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  return res
    .status(200)
    .json({ message: "fetched successfully", data: products });
};

const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    category,
    images,
    description,
    promotionPercentage,
    originalPrice,
    price,
    isFeatured,
  } = req.body;

  console.log(req.body)

  return res.status(201).json({message : "created successfully",data : null})


  // name
};

export { getAllProducts, createProduct };
