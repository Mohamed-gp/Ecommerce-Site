"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
    provider: {
        type: String,
        required: true,
        enum: ["credentials", "google"],
        default: "credentials",
    },
    photoUrl: {
        type: String,
        required: true,
        default: "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg",
    },
    cart: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Cart",
        },
    ],
    wishlist: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    isSubscribe: {
        type: Boolean,
        default: false,
        required: true,
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
schema.statics["build"] = (attrs) => {
    return new User(attrs);
};
const User = mongoose_1.default.model("User", schema);
exports.default = User;
//# sourceMappingURL=User.js.map