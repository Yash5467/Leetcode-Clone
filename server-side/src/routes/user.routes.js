import { Router } from "express";
import { login, signup } from "../controllers/user.controller.js";


 export const userRouter=Router();
// signup route
 userRouter.route("/signup").post(signup);
 userRouter.route("/login").post(login);





