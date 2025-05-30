"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("../controllers/categoriesController");
const verifyToken_1 = require("../middlewares/verifyToken");
const demoAdmin_1 = __importDefault(require("../middlewares/demoAdmin"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(categoriesController_1.getAllCategories)
    .post(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, categoriesController_1.createCategory);
router
    .route("/:id")
    .delete(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, categoriesController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoriesRouter.js.map