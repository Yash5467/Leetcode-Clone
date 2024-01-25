import {Router} from 'express'
import { getAllProblems, getProblem, getTestCases, searchProblem } from '../controllers/problem.controller.js';

 export const problemRouter=Router();

 problemRouter.route("/get-all").get(getAllProblems);
 problemRouter.route("/:problemId").get(getProblem);
 problemRouter.route("/search").post(searchProblem);
 problemRouter.route("/test-cases").post(getTestCases);
