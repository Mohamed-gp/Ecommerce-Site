import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/commentsController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.route("/:userId/:commentId").delete(verifyToken, deleteComment);
router.route("/:productId").post(verifyToken, addComment).get(getComments);

export default router;
