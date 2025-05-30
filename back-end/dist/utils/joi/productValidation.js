"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCreateProduct = void 0;
const joi_1 = __importDefault(require("joi"));
const verifyCreateProduct = (obj) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(30).required(),
        category: joi_1.default.string().min(7).max(50).required(),
        description: joi_1.default.string().min(300).max(381).required(),
        promotionPercentage: joi_1.default.number().min(1).max(99).required(),
        price: joi_1.default.number().min(10).max(10000).required(),
        isFeatured: joi_1.default.boolean().required(),
    });
    return schema.validate(obj);
};
exports.verifyCreateProduct = verifyCreateProduct;
//# sourceMappingURL=productValidation.js.map