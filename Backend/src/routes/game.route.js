import {Router} from 'express';
import {getRandomQuestions} from '../Controller/game.controller.js';
import {validateAnswer} from '../Controller/game.controller.js';
const router = Router();
router.route('/startgame').get(getRandomQuestions);
router.route('/validateanswer').post(validateAnswer);
export default router;