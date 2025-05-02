import {Router} from 'express'
import { dmController } from './chat.controller'

const router: Router = Router()

router.get('/dm', dmController)

export default router
