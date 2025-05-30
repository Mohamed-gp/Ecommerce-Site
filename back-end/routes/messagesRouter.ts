import { Router } from "express";
import {
  sendMessage,
  getAllMessages,
  getUnreadMessagesCount,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/messagesController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";

const router = Router();

// Public routes
router.route("/send").post(sendMessage);

// Admin routes
router.route("/").get(verifyToken, verifyAdmin, getAllMessages);
router
  .route("/unread-count")
  .get(verifyToken, verifyAdmin, getUnreadMessagesCount);
router.route("/:id/read").patch(verifyToken, verifyAdmin, markMessageAsRead);
router.route("/:id").delete(verifyToken, verifyAdmin, deleteMessage);

export default router;
