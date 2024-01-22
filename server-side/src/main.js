import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user.routes.js';
import { upload } from './middilewares/multer.middileware.js';
import cookieParsor from 'cookie-parser'
import { codeRouter } from './routes/code.routes.js';
const app=express();
// handling CORS
app.use(cors({
    origin:process.env.CLIENT_SIDE_ENDPOINT
}))
app.use(cookieParsor());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// user router 
app.use("/user",upload.single("avatar"),userRouter);
app.use("/code",codeRouter);



export{
    app
}

