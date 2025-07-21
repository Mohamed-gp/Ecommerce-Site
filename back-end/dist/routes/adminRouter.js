"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const productsController_1 = require("../controllers/productsController");
const verifyToken_1 = require("../middlewares/verifyToken");
const demoAdmin_1 = __importDefault(require("../middlewares/demoAdmin"));
const router = (0, express_1.Router)();
router
    .route("/admins")
    .get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, adminController_1.getAdmins)
    .post(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, adminController_1.addAdmin);
router.route("/users").get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, adminController_1.getAllUsers);
router
    .route("/users/:id/role")
    .patch(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, adminController_1.updateUserRole);
router
    .route("/users/:id")
    .delete(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, adminController_1.deleteUser);
router.route("/users/count").get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, adminController_1.getUsersCount);
router
    .route("/categories/count")
    .get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, adminController_1.getCategoriesCount);
router.route("/products").get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, adminController_1.getAllProductsForAdmin);
router
    .route("/products/:id")
    .delete(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, productsController_1.deleteProduct);
router.route("/products/count").get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, adminController_1.getProductsCount);
router.route("/comments/count").get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, adminController_1.getCommentsCount);
router.route("/comments").get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, adminController_1.getAllComments);
router
    .route("/comments/:id")
    .delete(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, adminController_1.deleteCommentAsAdmin);
router.route("/analytics").get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, adminController_1.getDashboardAnalytics);
router
    .route("/admins/:id")
    .delete(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, adminController_1.deleteAdmin);
exports.default = router;
//# sourceMappingURL=adminRouter.js.map