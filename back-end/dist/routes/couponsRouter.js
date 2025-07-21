"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middlewares/verifyToken");
const demoAdmin_1 = __importDefault(require("../middlewares/demoAdmin"));
const couponsController_1 = require("../controllers/couponsController");
const router = express_1.default.Router();
router.get("/", verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, couponsController_1.getAllCoupons);
router.post("/", verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, couponsController_1.createCoupon);
router.delete("/:id", verifyToken_1.verifyToken, verifyToken_1.verifyAdmin, demoAdmin_1.default, couponsController_1.deleteCoupon);
router.post("/validate", couponsController_1.validateCoupon);
exports.default = router;
//# sourceMappingURL=couponsRouter.js.map