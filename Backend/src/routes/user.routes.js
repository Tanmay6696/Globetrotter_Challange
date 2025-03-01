import {Router} from 'express';
import { createuser,loginUser } from '../Controller/user.controller.js';
const router = Router();
router.route('/register').post(createuser);
router.route('/login').post(loginUser);
export default router;