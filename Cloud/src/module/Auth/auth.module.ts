import { Router } from "express";
import { authController } from "./auth.controller";

const router: Router = Router()

router.post('/', authController)

export default router
