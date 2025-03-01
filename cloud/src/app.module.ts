import { Application } from 'express'
import userController from './module/User/user.module'

export default (app: Application) => {
  app.use('/api/user', userController)
}
