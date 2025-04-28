import { Application } from 'express';
import AuthRouter from './Module/Authentication/auth.module';
import UserRouter from './Module/User/user.module';

export default (app: Application) => {
     app.use('/api/auth', AuthRouter);
     app.use('/api/user',  UserRouter);
}
