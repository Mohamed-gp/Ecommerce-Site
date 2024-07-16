import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categoriesController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";

const router = Router();

router
  .route("/")
  .get(getAllCategories)
  .post(verifyToken, verifyAdmin, createCategory);
router.route("/:id").delete(verifyToken, verifyAdmin, deleteCategory);

export default router;
