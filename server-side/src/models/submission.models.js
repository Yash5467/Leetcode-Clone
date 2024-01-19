import mongoose from "mongoose";


const submissionSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    problemId:{
        type: mongoose.Types.ObjectId,
        ref:"Problem"
    },
    language:{
        required: true,
        type: String
    },
    code:{
        required: true,
        type: String
    },
    accepted:{
        type: Boolean,
        default : false
    }
},{timestamps: true})