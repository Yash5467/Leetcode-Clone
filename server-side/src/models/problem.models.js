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
   constraints: {
         type: String,
         required: true
    } ,
    likes:{
        type: Number,
        default: 0
    },
    dislikes:{
        type:Number,
        default: 0
    }
    ,
    testCases:[
        {
            type: mongoose.Types.ObjectId
        }
    ]

},{timestamps: true});
problemSchema.index({"tittle":"text"})
export const Problem=mongoose.model("Problem",problemSchema);