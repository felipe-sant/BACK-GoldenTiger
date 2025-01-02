import { Router } from 'express';
import PlayController from '../controllers/play.controller';

const router = Router();
const exampleController = new PlayController()

router.get('/play/round', exampleController.playRound.bind(exampleController));

export default router