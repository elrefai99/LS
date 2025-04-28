import { Application } from 'express'
import userController from './module/User/user.module'
import authRouter from './module/Auth/auth.module'

export default (app: Application) => {
  app.use('/ls/main/connect/user', userController)
  app.use('/ls/main/connect/auth', authRouter)
}
