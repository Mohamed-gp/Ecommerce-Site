"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getComments = exports.addComment = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Comment_1 = __importDefault(require("../models/Comment"));
const addComment = async (req, res, next) => {
    const { content, rating, userId } = req.body;
    const { productId } = req.params;
    try {
        if (!req.user || req.user.id != userId) {
            return res
                .status(403)
                .json({ data: null, message: "access denied,only user himself" });
        }
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "product not found", data: null });
        }
        const isAlreadyCommented = await Comment_1.default.findOne({
            product: productId,
            user: userId,
        });
        if (isAlreadyCommented) {
            return res
                .status(400)
                .json({ message: "you already reviewed this product", data: null });
        }
        const comment = await Comment_1.default.create({
            content: content,
            product: productId,
            user: userId,
            rate: rating,
        });
        const comments = await Comment_1.default.find({ product: productId }).populate("user");
        comments.map((comment) => {
            comment.user.password = "";
        });
        return res
            .status(200)
            .json({ data: comments, message: "comment created successfull" });
    }
    catch (error) {
        return next(error);
    }
};
exports.addComment = addComment;
const getComments = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "product not found", data: null });
        }
        const comments = await Comment_1.default.find({ product: productId }).populate("user");
        // console.log(comments);
        comments.map((comment) => {
            comment.user.password = "";
        });
        return res
            .status(200)
            .json({ data: comments, message: "comments fetched successfull" });
    }
    catch (error) {
        return next(error);
    }
};
exports.getComments = getComments;
const deleteComment = async (req, res, next) => {
    try {
        const { commentId, userId } = req.params;
        if (!req.user || req.user.id != userId) {
            return res
                .status(403)
                .json({ data: null, message: "access denied,only user himself" });
        }
        const comment = await Comment_1.default.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "comment doesn't exist" });
        }
        await Comment_1.default.findByIdAndDelete(comment._id);
        return res
            .status(200)
            .json({ data: null, message: "comment deleted successfull" });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=commentsController.js.map