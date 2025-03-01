import { Router } from "express";
import { userController } from "./user.controller";
import { uploadAvatar } from "../../Common/functions/multer/multer.fun";

const router: Router = Router()

router.post('/', uploadAvatar, userController)

export default router
