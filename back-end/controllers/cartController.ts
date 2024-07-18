import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Cart from "../models/Cart";
import { authRequest } from "../interfaces/authInterface";

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, userId, quantity } = req.body;

  try {
    let user = await User.findById(userId).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    let cart = await Cart.findOne({
      user: userId,
      product: productId,
    }).populate("product");
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        product: productId,
        quantity: quantity || 1,
      });

      cart = await Cart.findById(cart._id).populate("product");
      user.cart.push(cart._id);
      await user.save();
    } else {
      quantity ? (cart.quantity = quantity) : cart.quantity++;
      // cart.quantity++ = quantity;
      await cart.save();
    }

    user = await User.findById(userId).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    return res
      .status(200)
      .json({ message: "Added successfully to cart", data: user.cart });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const deleteFromCart = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const { productId, userId } = req.params;

  if (userId !== req.user.id) {
    return res.status(403).json({
      data: null,
      message: "Access denied, you must be the user himself",
    });
  }

  try {
    let cart = await Cart.findOne({
      product: productId,
      user: userId,
    }).populate("product");

    if (!cart) {
      return res.status(400).json({
        message: "This product doesn't exist in the cart",
        data: null,
      });
    }

    await Cart.findOneAndDelete({
      user: userId,
      product: productId,
    });

    let user = await User.findById(userId).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    user.cart = user.cart.filter(
      (ele: any) => productId !== ele.product._id.toString()
    );
    await user.save();

    return res
      .status(200)
      .json({ message: "Removed successfully from the cart", data: user.cart });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

export { addToCart, deleteFromCart };
