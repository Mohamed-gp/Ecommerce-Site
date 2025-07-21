"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const verifyObjectId = (req, res, next) => {
    //   if (!isObjectIdOrHexString(req.params.id)) {
    //     return res.status(400).json({ data: null, message: "ivalid id" });
    //   }
    //   next();
    const id = req.params["id"];
    if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "invalid id" });
    }
    return next();
};
exports.default = verifyObjectId;
//# sourceMappingURL=verifyObjectId.js.map