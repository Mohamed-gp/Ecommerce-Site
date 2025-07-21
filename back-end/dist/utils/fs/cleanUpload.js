"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const removefiles = async () => {
    const files = await fs_1.default.promises.readdir("upload");
    files.forEach(async (file) => {
        fs_1.default.promises.unlink(path_1.default.join("upload", file));
    });
};
exports.default = removefiles;
//# sourceMappingURL=cleanUpload.js.map