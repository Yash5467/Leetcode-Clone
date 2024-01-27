import mongoose from "mongoose";


const progressSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    easy:{
        type: Number,
        default :0
    },
    medium:{
        type: Number,
        default :0
    },
    hard:{
        type: Number,
        default :0
    },
    rank:{
        type: Number,
        default: undefined
    }
},{timestamps: true});



export const Progress=mongoose.model("Progress",progressSchema);