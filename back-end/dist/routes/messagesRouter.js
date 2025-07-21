"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messagesController_1 = require("../controllers/messagesController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
// Public routes
router.route("/send").post(messagesController_1.sendMessage);
// Admin routes
router.route("/").get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, messagesController_1.getAllMessages);
router
    .route("/unread-count")
    .get(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, messagesController_1.getUnreadMessagesCount);
router.route("/:id/read").patch(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, messagesController_1.markMessageAsRead);
router.route("/:id").delete(verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, messagesController_1.deleteMessage);
exports.default = router;
//# sourceMappingURL=messagesRouter.js.map