import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const { refreshToken, accessToken } = req.cookies;
  // Checkig Tokens
    if(!refreshToken || !accessToken) throw new ApiError(400,"Unauthorized Access");
    // Decrypting Access Token
  const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  if (!user) throw new ApiError(400, "Unauthorized Access");
 // Checking User into DB
  const userValidation = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!userValidation) throw new ApiError(400, "Unauthorized Access");
// Adding User Object into req Object
  req.user = userValidation;

  next();
});
