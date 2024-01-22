import { Problem } from "../models/problem.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getAllProblems=asyncHandler(async(_,res)=>{
    const problems=await Problem.find();
    if(!problems) throw new ApiError(500,"Error Occured While Getting Problems");
    res.status(200).json(new ApiResponse(200,problems,"Problems Recived Succesfully"));
});

export const getProblem=asyncHandler(async(req,res)=>{
    const {problemId}=req.params;
    if(!problemId) throw new ApiError(401,"ProblemId Required");

    const problem=await Problem.findById(problemId);

    if(!problem) throw new ApiError(500,"Error Occured While Getting Problem");

    res.status(200).json(new ApiResponse(200,problem,"Problem Recived Successfully"));
})