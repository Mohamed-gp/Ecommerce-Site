"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const verifyToken_1 = require("../middlewares/verifyToken");
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
router.route("/subscribe").post(usersController_1.subscribe);
router
    .route("/:id")
    .get(usersController_1.getUserByIdController)
    .post(verifyToken_1.verifyToken, verifyToken_1.verifyUser, multer_1.default.single("image"), usersController_1.updateUserData);
exports.default = router;
//# sourceMappingURL=usersRouter.js.map