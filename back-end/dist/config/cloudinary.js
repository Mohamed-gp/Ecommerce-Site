"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Ensure environment variables are defined
const cloudinaryName = process.env["CLOUDINARY_NAME"];
const cloudinaryKey = process.env["CLOUDINARY_KEY"];
const cloudinarySecret = process.env["CLOUDINARY_SEC"];
if (!cloudinaryName || !cloudinaryKey || !cloudinarySecret) {
    throw new Error("Missing required Cloudinary environment variables");
}
cloudinary_1.v2.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryKey,
    api_secret: cloudinarySecret,
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map