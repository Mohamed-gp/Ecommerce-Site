import { Router } from "express";
import {
  getUserByIdController,
  updateUserData,
  subscribe,
} from "../controllers/usersController";
import { verifyToken, verifyUser } from "../middlewares/verifyToken";
import upload from "../config/multer";

const router = Router();

router.route("/subscribe").post(subscribe);
router
  .route("/:id")
  .get(getUserByIdController)
  .post(verifyToken, verifyUser, upload.single("image"), updateUserData);

export default router;
