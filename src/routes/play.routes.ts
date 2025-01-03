import { Router } from 'express';
import PlayController from '../controllers/play.controller';

const router = Router();
const exampleController = new PlayController()

router.get('/play', exampleController.playRound.bind(exampleController));
router.get('/play/muchRounds', exampleController.playGame.bind(exampleController))

export default router