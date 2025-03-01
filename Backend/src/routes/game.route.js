import {Router} from 'express';
import {validateAnswer,getRandomQuestions,getQuestionofparticularIndex,getFinalScore} from '../Controller/game.controller.js';
const router = Router();
router.route('/startgame').get(getRandomQuestions);
router.route('/validateanswer').post(validateAnswer);
router.route('/getparticularquestion').post(getQuestionofparticularIndex);
router.route('/finalscoredcard').post(getFinalScore);

export default router;