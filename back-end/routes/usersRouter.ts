import { Router } from "express";
import {
  getUserByIdController,
  updateUserData,
} from "../controllers/usersController";
import { verifyToken, verifyUser } from "../middlewares/verifyToken";
import upload from "../config/multer"


const router = Router();

router
  .route("/:id")
  .get(getUserByIdController)
  .post(verifyToken, verifyUser, upload.single("image"), updateUserData);

export default router;
