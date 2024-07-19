import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import multer from "multer";
import removeFiles from "../utils/fs/cleanUpload";
import { verifyUpdateUser } from "../utils/joi/userValidation";
import cloudinary from "../config/cloudinary";

const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ data: null, message: "no user found with this email" });
    }
    user.password = "";
    user.cart = null;
    return res.status(200).json({
      data: user,
      message: "user found",
    });
  } catch (error) {
    next(error);
  }
};

const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;
  try {
    if (!username && !req.file) {
      return res
        .status(400)
        .json({ data: null, message: "enter one of the inputs" });
    }

    const { error } = verifyUpdateUser(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details[0].message, data: null });
    }
    const file = req.file as Express.Multer.File;
    let user = await User.findById(req.params.id).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    if (file) {
      try {
        const picture = file.path;
        const uploadedPicture = await cloudinary.uploader.upload(picture);
        console.log(uploadedPicture);
        const pictureUrl = uploadedPicture.url;
        user.photoUrl = pictureUrl;
        removeFiles();
      } catch (error) {
        next(error);
      }
    }
    if (username != "") {
      user.username = username;
    }
    await user.save();
    user.password = "";
    return res
      .status(201)
      .json({ message: "user info updated successfull", data: user });
  } catch (error) {
    next(error);
  }
};

export { getUserByIdController, updateUserData };
