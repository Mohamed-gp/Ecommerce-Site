import { Router } from "express";
import {
  getAdmins,
  addAdmin,
  deleteAdmin,
  getUsersCount,
  getCategoriesCount,
  getProductsCount,
  getCommentsCount,
  getDashboardAnalytics,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllComments,
  deleteCommentAsAdmin,
  getAllProductsForAdmin,
} from "../controllers/adminController";
import { deleteProduct } from "../controllers/productsController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
import demoAdmin from "../middlewares/demoAdmin";
const router = Router();

router
  .route("/admins")
  .get(verifyToken, verifyAdmin, getAdmins)
  .post(verifyToken, verifyAdmin, demoAdmin, addAdmin);
router.route("/users").get(verifyToken, verifyAdmin, getAllUsers);
router
  .route("/users/:id/role")
  .patch(verifyToken, verifyAdmin, demoAdmin, updateUserRole);
router
  .route("/users/:id")
  .delete(verifyToken, verifyAdmin, demoAdmin, deleteUser);
router.route("/users/count").get(verifyToken, verifyAdmin, getUsersCount);
router
  .route("/categories/count")
  .get(verifyToken, verifyAdmin, getCategoriesCount);
router.route("/products").get(verifyToken, verifyAdmin, getAllProductsForAdmin);
router
  .route("/products/:id")
  .delete(verifyToken, verifyAdmin, demoAdmin, deleteProduct);
router.route("/products/count").get(verifyToken, verifyAdmin, getProductsCount);
router.route("/comments/count").get(verifyToken, verifyAdmin, getCommentsCount);
router.route("/comments").get(verifyToken, verifyAdmin, getAllComments);
router
  .route("/comments/:id")
  .delete(verifyToken, verifyAdmin, demoAdmin, deleteCommentAsAdmin);
router.route("/analytics").get(verifyToken, verifyAdmin, getDashboardAnalytics);
router
  .route("/admins/:id")
  .delete(verifyToken, verifyAdmin, demoAdmin, deleteAdmin);

export default router;
