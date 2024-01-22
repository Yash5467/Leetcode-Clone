import {Router} from 'express'
import { getAllProblems, getProblem } from '../controllers/problem.controller.js';

 export const problemRouter=Router();

 problemRouter.route("/get-all").get(getAllProblems);
 problemRouter.route("/:problemId").get(getProblem);
