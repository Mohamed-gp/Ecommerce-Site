"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
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
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(_doc, ret) {
            ret["id"] = ret["_id"];
            delete ret["_id"];
            delete ret["__v"];
        },
    },
});
cartSchema.statics["build"] = (attrs) => {
    return new Cart(attrs);
};
const Cart = mongoose_1.default.model("Cart", cartSchema);
exports.default = Cart;
//# sourceMappingURL=Cart.js.map