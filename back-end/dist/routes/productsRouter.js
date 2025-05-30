"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const verifyToken_1 = require("../middlewares/verifyToken");
const multer_1 = __importDefault(require("../config/multer"));
const verifyObjectId_1 = __importDefault(require("../middlewares/verifyObjectId"));
const demoAdmin_1 = __importDefault(require("../middlewares/demoAdmin"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(productsController_1.getAllProducts)
    .post(multer_1.default.array("images"), verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, productsController_1.createProduct);
router.route("/featured").get(productsController_1.getFeaturedProducts);
router.route("/new-arrivals").get(productsController_1.getNewArrivals);
router.route("/wishlist").post(verifyToken_1.verifyToken, productsController_1.toggleWishlist);
router
    .route("/:id")
    .get(verifyObjectId_1.default, productsController_1.getProduct)
    .delete(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, productsController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productsRouter.js.map