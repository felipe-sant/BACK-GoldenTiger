import { Router } from 'express';
import UserController from '../controllers/user.controller';
import authenticateToken from '../middleware/authenticateToken';
import limiter from '../constants/routerLimiter';
import root from '../middleware/root';

const router = Router();
const userController = new UserController()

router.post('/user/login', limiter, userController.loginUser.bind(userController));
router.post('/user/logout', limiter, authenticateToken, userController.logoutUser.bind(userController));
router.post('/user/register', limiter, userController.registerUser.bind(userController));
router.post('/user/register/root', limiter, root, userController.registerUser.bind(userController));

export default router