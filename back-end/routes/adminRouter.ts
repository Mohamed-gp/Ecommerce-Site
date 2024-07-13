import { Router } from "express";
import { getAdmins ,addAdmin,deleteAdmin} from "../controllers/adminController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
const router = Router();

router.route("/admins").get(verifyToken, verifyAdmin, getAdmins).post(verifyToken, verifyAdmin, addAdmin);
router.route("/admins/:id").delete(verifyToken, verifyAdmin,deleteAdmin)

export default router;
