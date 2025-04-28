import {Router} from 'express';
import { LoginController, logoutController, refreshController, registerController } from './auth.controller';

const router: Router = Router();

router.post('/register', registerController)
router.post('/login', LoginController)
router.get('/refresh', refreshController)
router.get('/logout', logoutController)

export default router;
