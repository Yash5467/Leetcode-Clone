import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { fileUpload } from "../utils/FileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const options={
  httpOnly:true,
  secure: true
}
export const signup = asyncHandler(async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  // Checking if Fields Are Not Filled
  if (!userName || !fullName || !email || !password)
    throw new ApiError(404, "Fields Are required");
  // Checking if User with same UserName of Email ID already Exists
  const userCheck = await User.findOne({
    $or: [{ userName }, { email }],
  });
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) throw new ApiError(404, "Avatar Required");

  if (userCheck) throw new ApiError(404, "Email or UserName Already Exists");

  // Email Validation
  const emailValidatorJson = await fetch(
    `${process.env.EMAIL_VALIDATOR_ENDPOINT}?api_key=${process.env.EMAIL_VALIDATOR_API_KEY}&email=${email}`
  );
  const emailValidator = await emailValidatorJson.json();

  if (emailValidator.status === "invalid")
    throw new ApiError(401, "Invalid Email Address");
  // Uploading Avatar to Cloudinary
  const avatar = await fileUpload(avatarLocalPath);

  if (!avatar) throw new ApiError(500, "Error While Uploading Avatar");
  // Creating new user
  const newUser = await User.create({
    userName,
    fullName,
    email,
    password,
    avatar: avatar.url,
  });
  // Checking User Created or not
  const user = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!user) throw new ApiError(500, "Error Occured While SignUp");
  // Sending Response
  res.status(200).json(new ApiResponse(200, user, "User SignUp Successfully"));
});



export const login=asyncHandler( async(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password) throw new ApiError(401,"Email and Password Are Required");

  const userValidation=await User.findOne({
    $or:[{email}]
  });

  if(!userValidation) throw new ApiError(400,"User Not Exist");

  const passwordVerification=await userValidation.isPasswordCorrect({password});

  if(!passwordVerification) throw new ApiError(400,"Incorrect Password");

  const accessToken=userValidation.generateAccessToken();
  const refreshToken=userValidation.generateRefreshToken();

  const user=await User.findByIdAndUpdate(userValidation._id,{
    refreshToken:refreshToken
  }).select("-password -refreshToken");


  if(!user) throw new ApiError(500,"Error While Updating Database");

  res.status(200).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options).json(new ApiResponse(200,user,"Login Successfully"));
})
