import { Router } from "express";
import { getUserByIdController } from "../controllers/usersController";
const router = Router()

router.route("/:id").get(getUserByIdController)



export default router