import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

export const fileUpload = async (localPath) => {
  if (!localPath) return null;

  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  });

  try {
    const file = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localPath);
    return file;
  } catch (error) {

    console.log("Error Occured While Uploading Avatar",error);
  }
};
