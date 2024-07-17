import { Router } from "express";
import { addToCart, deleteFromCart } from "../controllers/cartController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.route("/add").post(addToCart);
router.route("/delete/:userId/:productId").delete(verifyToken, deleteFromCart);

export default router;
