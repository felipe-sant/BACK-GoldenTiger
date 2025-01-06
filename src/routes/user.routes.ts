import { Router } from 'express';
import UserController from '../controllers/user.controller';
import authenticateToken from '../middleware/authenticateToken';

const router = Router();
const userController = new UserController()

router.get('/user', userController.getUsers.bind(userController));
router.post('/user/login', userController.loginUser.bind(userController));
router.post('/user/logout', authenticateToken, userController.logoutUser.bind(userController));
router.post('/user/register', userController.registerUser.bind(userController));

export default router