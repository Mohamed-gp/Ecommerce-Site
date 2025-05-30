import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Ensure environment variables are defined
const cloudinaryName = process.env["CLOUDINARY_NAME"];
const cloudinaryKey = process.env["CLOUDINARY_KEY"];
const cloudinarySecret = process.env["CLOUDINARY_SEC"];

if (!cloudinaryName || !cloudinaryKey || !cloudinarySecret) {
  throw new Error("Missing required Cloudinary environment variables");
}

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
});

export default cloudinary;
