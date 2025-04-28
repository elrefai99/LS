import {Router} from 'express';
import { editController, profileController } from './user.controller';
import { uploadAvatar } from '../../middleware/multer/multer.middleware';
import { isAuthenticationStatus } from '../../middleware/Auth/auth.middelware';

const router: Router = Router();

router.get('/', isAuthenticationStatus, profileController)
router.put('/:id', isAuthenticationStatus, uploadAvatar, editController)
router.delete('/:id', profileController)
// router.get('/:id', profileController)

export default router;
