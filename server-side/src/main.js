import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user.routes.js';
import { upload } from './middilewares/multer.middileware.js';
import cookieParsor from 'cookie-parser'
import { codeRouter } from './routes/code.routes.js';
import { problemRouter } from './routes/problem.routes.js';
import dotenv from 'dotenv'
dotenv.config();
const app=express();

// handling CORS
app.use(cors({
    origin: process.env.CLIENT_SIDE_ENDPOINT,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
app.use(cookieParsor());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// user router 
app.use("/user",upload.single("avatar"),userRouter);
app.use("/code",codeRouter);
app.use("/problem",problemRouter);


export{
    app
}

