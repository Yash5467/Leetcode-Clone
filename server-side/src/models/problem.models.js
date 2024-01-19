import mongoose from "mongoose";


const problemSchema=new mongoose.Schema({
    tittle:{
        required: true,
        type: String
    },
    serialNumber:{
        required: true,
        type: Number
    },
    description:{
        type: String,
        required: true
    },
    difficulty:{
        type: String,
        enum:["Easy","Medium","Hard"],
        required: true
    },
    tags :{
        type: String,
        required: true
    },
    category: {
        type : String,
        required: true
    },
    solution: {
        type: String,
        required : true
    },
    testCases:[
        {
            type: mongoose.Types.ObjectId
        }
    ]

},{timestamps: true})