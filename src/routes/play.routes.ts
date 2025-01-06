import { Router } from 'express';
import PlayController from '../controllers/play.controller';
import UserController from '../controllers/user.controller';
import authenticateToken from '../middleware/authenticateToken';

const router = Router();
const playController = new PlayController()

router.get('/play', authenticateToken, playController.playRound.bind(playController));
router.get('/play/muchRounds', authenticateToken, playController.playGame.bind(playController))

export default router