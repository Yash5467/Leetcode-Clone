import mongoose from "mongoose";


const progressSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    problemsSolved:{
        type: Number,
        default :0
    },
    rank:{
        type: Number,
        default: undefined
    }
},{timestamps: true});



export const Progress=mongoose.model("Progress",progressSchema);