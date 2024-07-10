import { Router } from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/productsController";
import { verifyAdmin } from "../middlewares/verifyToken";

const router = Router();

router.route("/").get(getAllProducts).post(verifyAdmin, createProduct);

export default router;
