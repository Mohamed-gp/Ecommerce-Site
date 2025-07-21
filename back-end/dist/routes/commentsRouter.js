"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentsController_1 = require("../controllers/commentsController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.route("/:userId/:commentId").delete(verifyToken_1.verifyToken, commentsController_1.deleteComment);
router.route("/:productId").post(verifyToken_1.verifyToken, commentsController_1.addComment).get(commentsController_1.getComments);
exports.default = router;
//# sourceMappingURL=commentsRouter.js.map