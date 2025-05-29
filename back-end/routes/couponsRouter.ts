import express from "express";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
import {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
  validateCoupon,
} from "../controllers/couponsController";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllCoupons);
router.post("/", verifyToken, verifyAdmin, createCoupon);
router.delete("/:id", verifyToken, verifyAdmin, deleteCoupon);
router.post("/validate", validateCoupon);

export default router;
