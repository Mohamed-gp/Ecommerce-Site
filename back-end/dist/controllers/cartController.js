"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCart = exports.addToCart = void 0;
const User_1 = __importDefault(require("../models/User"));
const Cart_1 = __importDefault(require("../models/Cart"));
const mongoose_1 = require("mongoose");
const addToCart = async (req, res, next) => {
    const { productId, userId, quantity } = req.body;
    try {
        const user = await User_1.default.findById(new mongoose_1.Types.ObjectId(userId))
            .populate({
            path: "cart",
            populate: {
                path: "product",
                model: "Product",
            },
        })
            .exec();
        if (!user) {
            return res.status(404).json({ message: "User not found", data: null });
        }
        let cartItem = await Cart_1.default.findOne({
            user: new mongoose_1.Types.ObjectId(userId),
            product: new mongoose_1.Types.ObjectId(productId),
        })
            .populate("product")
            .exec();
        if (!cartItem) {
            const newCartItem = await Cart_1.default.build({
                user: new mongoose_1.Types.ObjectId(userId),
                product: new mongoose_1.Types.ObjectId(productId),
                quantity: quantity || 1,
            });
            const savedCart = await newCartItem.save();
            cartItem = await Cart_1.default.findById(savedCart._id).populate("product").exec();
            if (!cartItem) {
                return res.status(500).json({
                    message: "Failed to create cart item",
                    data: null,
                });
            }
            user.cart.push(cartItem._id);
            await user.save();
        }
        else {
            cartItem.quantity = quantity || cartItem.quantity + 1;
            await cartItem.save();
        }
        const updatedUser = await User_1.default.findById(new mongoose_1.Types.ObjectId(userId))
            .populate({
            path: "cart",
            populate: {
                path: "product",
                model: "Product",
            },
        })
            .exec();
        return res
            .status(200)
            .json({
            message: "Added successfully to cart",
            data: updatedUser?.cart || [],
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.addToCart = addToCart;
const deleteFromCart = async (req, res, next) => {
    const { productId, userId } = req.params;
    if (!req.user?.id || userId !== req.user.id) {
        return res.status(403).json({
            data: null,
            message: "Access denied, you must be the user himself",
        });
    }
    try {
        const cartItem = await Cart_1.default.findOneAndDelete({
            user: new mongoose_1.Types.ObjectId(userId),
            product: new mongoose_1.Types.ObjectId(productId),
        }).exec();
        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found",
                data: null,
            });
        }
        const user = await User_1.default.findByIdAndUpdate(new mongoose_1.Types.ObjectId(userId), { $pull: { cart: cartItem._id } }, { new: true })
            .populate({
            path: "cart",
            populate: {
                path: "product",
                model: "Product",
            },
        })
            .exec();
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                data: null,
            });
        }
        return res
            .status(200)
            .json({ message: "Item removed from cart", data: user.cart });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteFromCart = deleteFromCart;
//# sourceMappingURL=cartController.js.map