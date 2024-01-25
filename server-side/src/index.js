import { app } from "./main.js";
import { connectDB } from "./database/db.js";




connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("App is running on port",process.env.PORT);
    })
})