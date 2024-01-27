import {Router} from 'express'
import { getProgress } from '../controllers/progress.controller.js';
import { verifyJWT } from '../middilewares/verifyjwt.middieware.js';

export const progressRouter=Router();

progressRouter.route("/get").get(verifyJWT,getProgress);