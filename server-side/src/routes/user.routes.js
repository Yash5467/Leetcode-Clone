import { Router } from "express";
import { getUser, login, logout, signup } from "../controllers/user.controller.js";
import { verifyJWT } from "../middilewares/verifyjwt.middieware.js";


 export const userRouter=Router();
// signup route
 userRouter.route("/signup").post(signup);
 // login route
 userRouter.route("/login").post(login);

// * protected routes
// logout route
userRouter.route("/logout").post(verifyJWT,logout);
// Get User Profile Route
userRouter.route("/get-user").get(verifyJWT,getUser);





