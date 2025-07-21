"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewArrivals = exports.toggleWishlist = exports.getFeaturedProducts = exports.deleteProduct = exports.getProduct = exports.createProduct = exports.getAllProducts = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const cleanUpload_1 = __importDefault(require("../utils/fs/cleanUpload"));
const productValidation_1 = require("../utils/joi/productValidation");
/**
 *
 * @method GET
 * @route /api/products?query
 * @access public
 * @desc get products
 *
 */
const getAllProducts = async (req, res, next) => {
    try {
        let { search, category, newArrivals } = req.query;
        if (search && search != "") {
            const products = await Product_1.default.find({
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
            const products = await Product_1.default.find()
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
            const products = await Product_1.default.find().populate("category").exec();
            const filteredProducts = products.filter((product) => product.category?.name == category);
            return res.status(200).json({
                message: "fetched Successfully",
                data: filteredProducts,
            });
        }
        const products = await Product_1.default.find().populate("category").exec();
        return res
            .status(200)
            .json({ message: "fetched successfully", data: products });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllProducts = getAllProducts;
/**
 *
 * @method GET
 * @route /api/products/:id
 * @access public
 * @desc get products
 *
 */
const getProduct = async (req, res, next) => {
    try {
        const product = await Product_1.default.findById(req.params["id"])
            .populate("category")
            .exec();
        if (!product) {
            return res.status(404).json({ data: null, message: "product not found" });
        }
        return res
            .status(200)
            .json({ message: "fetched successfully", data: product });
    }
    catch (error) {
        return next(error);
    }
};
exports.getProduct = getProduct;
const createProduct = async (req, res, next) => {
    try {
        (0, cleanUpload_1.default)();
        const { error } = (0, productValidation_1.verifyCreateProduct)(req.body);
        if (error && error.details && error.details[0]) {
            return res
                .status(400)
                .json({ message: error.details[0].message, data: null });
        }
        const files = req.files;
        if (files.length < 1) {
            return res.status(400).json({
                message: "you must upload at least one image of the product",
                data: null,
            });
        }
        const pictures = files?.map((file) => {
            return file.path;
        });
        const uploadedPictures = await Promise.all(pictures.map((picture) => cloudinary_1.default.uploader.upload(picture)));
        const pictureUrls = uploadedPictures.map((picture) => picture.url);
        const product = Product_1.default.build({
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
    }
    catch (error) {
        return next(error);
    }
};
exports.createProduct = createProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product_1.default.findById(req.params["id"]).exec();
        if (!product) {
            return res
                .status(404)
                .json({ data: null, message: "no product find with this id" });
        }
        else {
            await Product_1.default.findByIdAndDelete(req.params["id"]);
            return res
                .status(200)
                .json({ data: null, message: "deleted successfully" });
        }
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteProduct = deleteProduct;
const getFeaturedProducts = async (_req, res, next) => {
    try {
        const products = await Product_1.default.find({ isFeatured: true }).exec();
        return res
            .status(200)
            .json({ message: "fetched successfully", data: products });
    }
    catch (error) {
        return next(error);
    }
};
exports.getFeaturedProducts = getFeaturedProducts;
/**
 * @method GET
 * @route /api/products/new-arrivals
 * @access public
 * @desc get new arrival products (latest 8 products)
 */
const getNewArrivals = async (_req, res, next) => {
    try {
        const products = await Product_1.default.find()
            .sort({ createdAt: -1 })
            .limit(8)
            .populate("category")
            .exec();
        return res.status(200).json({
            message: "New arrivals fetched successfully",
            data: products,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getNewArrivals = getNewArrivals;
const toggleWishlist = async (req, res, next) => {
    const { userId, productId } = req.body;
    try {
        if (!req.user || userId !== req.user.id) {
            return res.status(403).json({
                data: null,
                message: "Access denied, you must be the user himself",
            });
        }
        let user = await User_1.default.findById(userId).populate("wishlist").exec();
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const isExist = user.wishlist.find((ele) => productId == ele._id);
        if (isExist) {
            user.wishlist = user.wishlist.filter((ele) => ele._id != productId);
        }
        else {
            user.wishlist.push(productId);
        }
        await user.save();
        user = await User_1.default.findById(userId).populate("wishlist").exec();
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        return res
            .status(200)
            .json({ message: "wishlist toggled successfull", data: user.wishlist });
    }
    catch (error) {
        return next(error);
    }
};
exports.toggleWishlist = toggleWishlist;
//# sourceMappingURL=productsController.js.map