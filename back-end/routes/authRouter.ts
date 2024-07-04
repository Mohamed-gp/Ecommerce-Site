import { Router } from "express";
const authRouter = Router();
import {
  googleSignIncontroller,
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController";

authRouter.route("/login").post(loginController);
authRouter.route("/register").post(registerController);
authRouter.route("/google").post(googleSignIncontroller);
authRouter.route("/logout").post(logoutController);

export default authRouter;
