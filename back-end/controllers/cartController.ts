import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Cart from "../models/Cart";
import { authRequest } from "../interfaces/authInterface";
import { Types } from "mongoose";

const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { productId, userId, quantity } = req.body;

  try {
    const user = await User.findById(new Types.ObjectId(userId))
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

    let cartItem = await Cart.findOne({
      user: new Types.ObjectId(userId),
      product: new Types.ObjectId(productId),
    })
      .populate("product")
      .exec();

    if (!cartItem) {
      const newCartItem = await Cart.build({
        user: new Types.ObjectId(userId),
        product: new Types.ObjectId(productId),
        quantity: quantity || 1,
      });

      const savedCart = await newCartItem.save();
      cartItem = await Cart.findById(savedCart._id).populate("product").exec();

      if (!cartItem) {
        return res.status(500).json({
          message: "Failed to create cart item",
          data: null,
        });
      }

      user.cart.push(cartItem._id as Types.ObjectId);
      await user.save();
    } else {
      cartItem.quantity = quantity || cartItem.quantity + 1;
      await cartItem.save();
    }

    const updatedUser = await User.findById(new Types.ObjectId(userId))
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
  } catch (error) {
    return next(error);
  }
};

const deleteFromCart = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { productId, userId } = req.params;

  if (!req.user?.id || userId !== req.user.id) {
    return res.status(403).json({
      data: null,
      message: "Access denied, you must be the user himself",
    });
  }

  try {
    const cartItem = await Cart.findOne({
      user: new Types.ObjectId(userId),
      product: new Types.ObjectId(productId),
    }).exec();

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
        data: null,
      });
    }

    // Delete the cart item
    await Cart.findOneAndDelete({
      user: new Types.ObjectId(userId),
      product: new Types.ObjectId(productId),
    }).exec();

    const user = await User.findByIdAndUpdate(
      new Types.ObjectId(userId),
      { $pull: { cart: cartItem._id } },
      { new: true }
    )
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
  } catch (error) {
    return next(error);
  }
};

export { addToCart, deleteFromCart };
