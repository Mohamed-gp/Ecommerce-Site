"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkoutController_1 = require("../controllers/checkoutController");
const router = (0, express_1.Router)();
router.route("/").post(checkoutController_1.createPayment);
exports.default = router;
//# sourceMappingURL=checkoutRouter.js.map