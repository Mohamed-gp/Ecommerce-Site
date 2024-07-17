import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getFeaturedProducts,
  toggleWishlist,
} from "../controllers/productsController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
import upload from "../config/multer";
import verifyObjectId from "../middlewares/verifyObjectId";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(upload.array("images"), verifyToken, verifyAdmin, createProduct);
router.route("/featured").get(getFeaturedProducts);
router.route("/wishlist").post(verifyToken, toggleWishlist);
router
  .route("/:id")
  .get(verifyObjectId, getProduct)
  .delete(verifyToken, verifyAdmin, deleteProduct);

export default router;
