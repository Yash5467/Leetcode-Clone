import { Router } from "express";
import { login, logout, signup } from "../controllers/user.controller.js";
import { verifyJWT } from "../middilewares/verifyjwt.middieware.js";


 export const userRouter=Router();
// signup route
 userRouter.route("/signup").post(signup);
 // login route
 userRouter.route("/login").post(login);

// * protected routes

userRouter.route("/logout").post(verifyJWT,logout);





