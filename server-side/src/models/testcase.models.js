import mongoose from "mongoose";    

const testcaseSchema=new mongoose.Schema({
    input:{
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
});


export const Testcase=mongoose.model("TestCase",testcaseSchema);