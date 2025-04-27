import { Application } from 'express';
import AuthRouter from './Module/Authentication/auth.module';

export default (app: Application) => {
     app.use('/api/auth', AuthRouter);
}
