"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configController_1 = require("../controllers/configController");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/config/firebase
 * @desc    Get Firebase configuration for frontend
 * @access  Public
 */
router.get("/firebase", configController_1.getFirebaseConfig);
exports.default = router;
//# sourceMappingURL=configRouter.js.map