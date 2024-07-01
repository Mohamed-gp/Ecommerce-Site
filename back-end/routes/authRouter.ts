import {Router} from "express"
const authRouter = Router()
import {loginController, registerController} from "../controllers/authController"

authRouter.route("/login").post(loginController)
authRouter.route("/register").post(registerController)



export default authRouter