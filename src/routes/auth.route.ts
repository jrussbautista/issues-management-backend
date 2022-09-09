import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.route('/signup').post(authController.signup);
authRouter.route('/login').post(authController.login);

export default authRouter;
