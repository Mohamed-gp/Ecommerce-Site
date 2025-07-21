"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.route("/add").post(cartController_1.addToCart);
router.route("/delete/:userId/:productId").delete(verifyToken_1.verifyToken, cartController_1.deleteFromCart);
exports.default = router;
//# sourceMappingURL=cartRouter.js.map