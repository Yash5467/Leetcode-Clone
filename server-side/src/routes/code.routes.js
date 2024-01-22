import { Router } from "express";
import {codeRunner} from '../controllers/code.controller.js'

export const codeRouter=Router();

codeRouter.route("/verify").post(codeRunner);
