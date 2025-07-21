import express from "express";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
import demoAdmin from "../middlewares/demoAdmin";
import {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
  validateCoupon,
} from "../controllers/couponsController";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllCoupons);
router.post("/", verifyToken, verifyAdmin, demoAdmin, createCoupon);
router.delete("/:id", verifyToken, verifyAdmin, demoAdmin, deleteCoupon);
router.post("/validate", validateCoupon);

export default router;
