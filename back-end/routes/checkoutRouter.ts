import { Router } from "express";
import { createPayment } from "../controllers/checkoutController";

const router = Router();

router.route("/").post(createPayment);

export default router;
