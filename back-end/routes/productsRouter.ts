import { NextFunction, Router } from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/productsController";
import {
  authRequest,
  verifyAdmin,
  verifyToken,
} from "../middlewares/verifyToken";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(verifyToken,verifyAdmin,createProduct);

export default router;
