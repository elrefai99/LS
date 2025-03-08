import { Router } from "express";
import { uploadVideo } from "../../Common/functions/multer/multer.fun";
import { videoController } from "./video.controller";

const router: Router = Router()

router.post('/', uploadVideo, videoController)

export default router
