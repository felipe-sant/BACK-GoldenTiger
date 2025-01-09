import { Router } from 'express';
import limiter from '../constants/routerLimiter';
import authenticateToken from '../middleware/authenticateToken';
import isAdmin from '../middleware/isAdmin';
import AdminController from '../controllers/admin.controller';

const router = Router();
const adminController = new AdminController();

router.get('/auth/', limiter, authenticateToken, isAdmin, adminController.getAuths.bind(adminController));
router.get('/user/', limiter, authenticateToken, isAdmin, adminController.getUsers.bind(adminController));
router.get('/user/:username', limiter, authenticateToken, isAdmin, adminController.getUser.bind(adminController));
router.post('/user/:username/setMoney', limiter, authenticateToken, isAdmin, adminController.setMoney.bind(adminController));
router.delete('/user/', limiter, authenticateToken, isAdmin, adminController.deleteUsers.bind(adminController));
router.delete('/user/:username', limiter, authenticateToken, isAdmin, adminController.deleteUser.bind(adminController));

export default router;