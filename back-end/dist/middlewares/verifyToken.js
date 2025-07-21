"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyAdminAndUser = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies["swiftbuy-token"];
    if (token) {
        try {
            const decodedPayload = jsonwebtoken_1.default.verify(token, process.env["JWT_SECRET"]);
            req.user = decodedPayload;
            return next();
        }
        catch (error) {
            return res
                .status(403)
                .json({ data: null, messsage: "access denied, invalid token" });
        }
    }
    else {
        return res.status(403).json({
            data: null,
            message: "access denied,no token provided",
        });
    }
};
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.id != req.params["id"]) {
            res.status(403).json({
                data: null,
                message: "access denied,you must be the user himself",
            });
            return;
        }
        next();
    });
};
exports.verifyUser = verifyUser;
const verifyAdminAndUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user &&
            (req.user.role == "admin" || req.user.id == req.params["id"])) {
            next();
            return;
        }
        res
            .status(403)
            .json({ data: null, message: "access denied,only admin himself" });
    });
};
exports.verifyAdminAndUser = verifyAdminAndUser;
const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role != "admin") {
        return res
            .status(403)
            .json({ data: null, message: "access denied,only admin himself" });
    }
    next();
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=verifyToken.js.map