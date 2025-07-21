"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUpdateUser = void 0;
const joi_1 = __importDefault(require("joi"));
// import {loginInterface, registerInterface} from "../../interfaces/authInterface"
const verifyUpdateUser = (obj) => {
    const schema = joi_1.default
        .object({
        username: joi_1.default.string().min(8).max(50).allow(""),
    })
        .unknown(true);
    return schema.validate(obj);
};
exports.verifyUpdateUser = verifyUpdateUser;
//# sourceMappingURL=userValidation.js.map