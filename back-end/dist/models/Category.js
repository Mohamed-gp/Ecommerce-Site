"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
const Category = mongoose_1.default.models.Category || mongoose_1.default.model("Category", Schema);
exports.default = Category;
//# sourceMappingURL=Category.js.map