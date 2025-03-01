import {Router} from 'express';
import { insertdata } from '../Controller/dataInsert.controller.js';
const router = Router();

router.route('/adddata').post(insertdata);
export default router;