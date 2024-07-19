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

import nodemailer from "nodemailer";
const subscribe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "mohamedterba6@gmail.com",
        pass: "kuxg yvue pwyt tbdc",  
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "m_outerbah@estin.dz", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    next(error);
  }
};

export { getUserByIdController, updateUserData, subscribe };
