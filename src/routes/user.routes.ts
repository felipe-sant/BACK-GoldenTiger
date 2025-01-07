import { Router } from 'express';
import UserController from '../controllers/user.controller';
import authenticateToken from '../middleware/authenticateToken';
import limiter from '../constants/routerLimiter';

const router = Router();
const userController = new UserController()

router.get('/user', limiter, userController.getUsers.bind(userController));
router.get('/user/auth', limiter, userController.getAuth.bind(userController));
router.post('/user/login', limiter, userController.loginUser.bind(userController));
router.post('/user/logout', limiter, authenticateToken, userController.logoutUser.bind(userController));
router.post('/user/register', limiter, userController.registerUser.bind(userController));

export default router