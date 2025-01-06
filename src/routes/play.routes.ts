import { Router } from 'express';
import PlayController from '../controllers/play.controller';
import UserController from '../controllers/user.controller';

const router = Router();
const playController = new PlayController()
const userController = new UserController()

router.get('/play', userController.authenticateToken, playController.playRound.bind(playController));
router.get('/play/muchRounds', userController.authenticateToken, playController.playGame.bind(playController))

export default router