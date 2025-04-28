import { Router } from "express";
import { userController } from "./user.controller";
import { uploadAvatar } from "../../Middleware/multer/multer.fun";

const router: Router = Router()

router.post('/', uploadAvatar, userController)

export default router
