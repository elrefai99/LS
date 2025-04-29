import { Router } from 'express';
import { changePassword, deleteController, disableController, editController, profileController } from './user.controller';
import { uploadAvatar } from '../../middleware/multer/multer.middleware';
import { isAuthenticationStatus } from '../../middleware/Auth/auth.middelware';

const router: Router = Router();

router.get('/', isAuthenticationStatus, profileController)
router.patch('/password', isAuthenticationStatus, changePassword)

router.put('/:id', isAuthenticationStatus, uploadAvatar, editController)
router.delete('/:id', isAuthenticationStatus, deleteController)
router.patch('/:id', isAuthenticationStatus, disableController)
export default router;
