"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
}, { timestamps: true });
const Comment = mongoose_1.default.models["Comment"] ||
    mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;
//# sourceMappingURL=Comment.js.map