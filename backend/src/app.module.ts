import { Application } from 'express'
import authRouter from './module/auth/auth.module'

export default (app: Application) => {
  app.use('/api/auth', authRouter)
}
