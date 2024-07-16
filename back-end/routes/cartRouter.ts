import { Router } from "express";
import { addToCart } from "../controllers/cartController";

const router = Router();

router.route("/add").post(addToCart);

export default router;
