import mongoose from "mongoose";

export const connectDB=async ()=>{
    try {
   const db=await mongoose.connect(`${process.env.MONGODB_ENDPOINT}/${process.env.MONGODB_DB_NAME}`);
         console.log(db.connection.host);
    } catch (error) {
        console.log("Error While Connecting To Database",error);
    }
}