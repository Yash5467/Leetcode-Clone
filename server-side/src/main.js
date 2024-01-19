import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user.routes.js';
import { upload } from './middilewares/multer.middileware.js';
const app=express();
// handling CORS
app.use(cors({
    origin:process.env.CLIENT_SIDE_ENDPOINT
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// user router 
app.use("/user",upload.single("avatar"),userRouter);




export{
    app
}

