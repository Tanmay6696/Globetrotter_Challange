import {Router} from 'express';
import { createChallange ,getChallengeDetails,validateAnswerinChallange} from '../Controller/challange.controller.js';
const router = Router();

router.route('/createchallnage').post(createChallange);
router.route('/:challengeId').get(getChallengeDetails);
router.route('/validateAnswer').post(validateAnswerinChallange);


export default router;