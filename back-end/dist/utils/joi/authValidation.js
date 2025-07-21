"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLogin = exports.verifyRegister = void 0;
const joi_1 = __importDefault(require("joi"));
// import {loginInterface, registerInterface} from "../../interfaces/authInterface"
const verifyRegister = (obj) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(8).max(50).required(),
        email: joi_1.default.string().min(8).max(50).required().email(),
        password: joi_1.default.string().required().min(8),
        // password: joiPasswordComplexity(),
    });
    return schema.validate(obj);
};
exports.verifyRegister = verifyRegister;
const verifyLogin = (obj) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(8).max(50).required().email(),
        password: joi_1.default.string().required().min(8),
        // password: joiPasswordComplexity(),
    });
    return schema.validate(obj);
};
exports.verifyLogin = verifyLogin;
//# sourceMappingURL=authValidation.js.map