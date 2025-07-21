"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
            name: {
                type: String,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "canceled"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    shippingAddress: {
        type: String,
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
orderSchema.statics["build"] = (attrs) => {
    return new Order(attrs);
};
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map