import { Progress } from "../models/progress.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getProgress=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    
  if(!_id) throw new ApiError(401,"Unauthorized Access");

  const userProgess=await Progress.findOne({userId:_id});

  if(!userProgess) throw new ApiError(401,"Invalid User");

  res.status(200).json(new ApiResponse(200,userProgess,"User Progess"));
})