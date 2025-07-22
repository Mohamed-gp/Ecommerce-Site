import { Request, Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
import Product from "../models/Product";
import Comment from "../models/Comment";
import { Console } from "console";

const addComment = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const { content, rating, userId } = req.body;
  const { productId } = req.params;
  try {
    if (!req.user || req.user.id != userId) {
      return res
        .status(403)
        .json({ data: null, message: "access denied,only user himself" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found", data: null });
    }
    const isAlreadyCommented = await Comment.findOne({
      product: productId,
      user: userId,
    });
    if (isAlreadyCommented) {
      return res
        .status(400)
        .json({ message: "you already reviewed this product", data: null });
    }
    const comment = await Comment.create({
      content: content,
      product: productId,
      user: userId,
      rate: rating,
    });

    // Add the comment to the product's comments array
    await Product.findByIdAndUpdate(productId, {
      $push: { comments: comment._id },
    });

    const comments = await Comment.find({ product: productId }).populate(
      "user"
    );
    comments.map((comment) => {
      comment.user.password = "";
    });
    return res
      .status(200)
      .json({ data: comments, message: "comment created successfull" });
  } catch (error) {
    return next(error);
  }
};

const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found", data: null });
    }
    const comments = await Comment.find({ product: productId }).populate(
      "user"
    );
    // console.log(comments);
    comments.map((comment) => {
      comment.user.password = "";
    });
    return res
      .status(200)
      .json({ data: comments, message: "comments fetched successfull" });
  } catch (error) {
    return next(error);
  }
};

const deleteComment = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId, userId } = req.params;
    if (!req.user || req.user.id != userId) {
      return res
        .status(403)
        .json({ data: null, message: "access denied,only user himself" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment doesn't exist" });
    }

    // Remove the comment from the product's comments array
    await Product.findByIdAndUpdate(comment.product, {
      $pull: { comments: comment._id },
    });

    await Comment.findByIdAndDelete(comment._id);
    return res
      .status(200)
      .json({ data: null, message: "comment deleted successfull" });
  } catch (error) {
    return next(error);
  }
};

export { addComment, getComments, deleteComment };
