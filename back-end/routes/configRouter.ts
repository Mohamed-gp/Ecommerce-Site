import { Router } from "express";
import { getFirebaseConfig } from "../controllers/configController";

const router = Router();

/**
 * @route   GET /api/config/firebase
 * @desc    Get Firebase configuration for frontend
 * @access  Public
 */
router.get("/firebase", getFirebaseConfig);

export default router;
