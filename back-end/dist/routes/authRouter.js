"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
const authController_1 = require("../controllers/authController");
authRouter.route("/login").post(authController_1.loginController);
authRouter.route("/register").post(authController_1.registerController);
authRouter.route("/google").post(authController_1.googleSignIncontroller);
authRouter.route("/logout").post(authController_1.logoutController);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map