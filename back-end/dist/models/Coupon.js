"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const couponSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const Coupon = mongoose_1.default.models.Coupon || mongoose_1.default.model("Coupon", couponSchema);
exports.default = Coupon;
//# sourceMappingURL=Coupon.js.map