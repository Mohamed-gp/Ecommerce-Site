"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    promoPercentage: {
        type: Number,
        required: true,
        min: 1,
        max: 99,
    },
    images: {
        type: [String],
        required: true,
    },
    isFeatured: {
        type: Boolean,
        required: true,
        default: false,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
}, { timestamps: true });
schema.statics["build"] = (attrs) => {
    return new Product(attrs);
};
const Product = mongoose_1.default.models["Product"] ||
    mongoose_1.default.model("Product", schema);
exports.default = Product;
//# sourceMappingURL=Product.js.map