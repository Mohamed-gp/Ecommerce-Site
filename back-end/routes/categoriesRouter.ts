import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categoriesController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
import demoAdmin from "../middlewares/demoAdmin";

const router = Router();

router
  .route("/")
  .get(getAllCategories)
  .post(verifyToken, verifyAdmin,demoAdmin, createCategory);
router
  .route("/:id")
  .delete(verifyToken, verifyAdmin, demoAdmin, deleteCategory);

export default router;
