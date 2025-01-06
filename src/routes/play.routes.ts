import { Router } from 'express';
import PlayController from '../controllers/play.controller';
import authenticateToken from '../middleware/authenticateToken';
import limiter from '../constants/routerLimiter';

const router = Router();
const playController = new PlayController()

router.get('/play', authenticateToken, limiter, playController.playRound.bind(playController));
router.get('/play/muchRounds', authenticateToken, limiter, playController.playGame.bind(playController))

export default router