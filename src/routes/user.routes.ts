import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();
const userController = new UserController()

router.get('/user', userController.getUsers.bind(userController));
router.post('/user/register', userController.registerUser.bind(userController));

export default router