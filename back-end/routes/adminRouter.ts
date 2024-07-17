import { Router } from "express";
import {
  getAdmins,
  addAdmin,
  deleteAdmin,
  getUsersCount,
  getCategoriesCount,
  getProductsCount,
  getCommentsCount,
} from "../controllers/adminController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
const router = Router();

router
  .route("/admins")
  .get(verifyToken, verifyAdmin, getAdmins)
  .post(verifyToken, verifyAdmin, addAdmin);
router.route("/users/count").get(verifyToken, verifyAdmin, getUsersCount);
router
  .route("/categories/count")
  .get(verifyToken, verifyAdmin, getCategoriesCount);
router.route("/products/count").get(verifyToken, verifyAdmin, getProductsCount);
router.route("/comments/count").get(verifyToken, verifyAdmin, getCommentsCount);
router.route("/admins/:id").delete(verifyToken, verifyAdmin, deleteAdmin);

export default router;
