import { Application } from 'express'
import userController from './module/User/user.module'
import authRouter from './module/auth/auth.module'
import videoRouter from './module/video/video.module'

export default (app: Application) => {
  app.use('/api/user', userController)
  app.use('/api/auth', authRouter)
  app.use('/api/video', videoRouter)
}
