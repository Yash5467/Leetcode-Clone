import { Router } from "express";
import { signup } from "../controllers/user.controller.js";


 export const userRouter=Router();
// signup route
 userRouter.route("/signup").post(signup);





