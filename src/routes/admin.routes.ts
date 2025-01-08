import { Router } from 'express';
import limiter from '../constants/routerLimiter';
import authenticateToken from '../middleware/authenticateToken';
import isAdmin from '../middleware/isAdmin';
import AdminController from '../controllers/admin.controller';

const router = Router();
const adminController = new AdminController();

router.get('/auth', limiter, authenticateToken, isAdmin, adminController.getAuth.bind(adminController));
router.get('/user', limiter, authenticateToken, isAdmin, adminController.getUsers.bind(adminController));

export default router;