import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import removeFiles from "../utils/fs/cleanUpload";
import { verifyUpdateUser } from "../utils/joi/userValidation";
import cloudinary from "../config/cloudinary";
import nodemailer from "nodemailer";

const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ data: null, message: "no user found with this email" });
    }
    user.password = "";
    user.cart = [] as any;
    return res.status(200).json({
      data: user,
      message: "user found",
    });
  } catch (error) {
    return next(error);
  }
};

const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { username } = req.body;
  try {
    if (!username && !req.file) {
      return res
        .status(400)
        .json({ data: null, message: "enter one of the inputs" });
    }

    const { error } = verifyUpdateUser(req.body);
    if (error && error.details && error.details[0]) {
      return res
        .status(400)
        .json({ message: error.details[0].message, data: null });
    }
    const file = req.file as Express.Multer.File;
    let user = await User.findById(req.params["id"])
      .populate({
        path: "cart",
        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate("wishlist");

    if (!user) {
      return res.status(404).json({ data: null, message: "User not found" });
    }

    if (file) {
      try {
        const picture = file.path;
        const uploadedPicture = await cloudinary.uploader.upload(picture);
        if (uploadedPicture) {
          // Picture uploaded successfully
          user.photoUrl = uploadedPicture.secure_url;
        }
        removeFiles();
      } catch (error) {
        return next(error);
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
    return next(error);
  }
};

const subscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "you must login with this email first with our app",
        data: null,
      });
    }

    if (user.isSubscribe) {
      return res
        .status(404)
        .json({ message: "you already subscribed", data: null });
    }
    user.isSubscribe = true;
    await user.save();

    const transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env["EMAIL"],
        pass: process.env["EMAIL_PASS_KEY"],
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: process.env["EMAIL"], // sender address
      to: email, // list of receivers
      subject: "SwiftBuy Subscription ✔", // Subject line
      text: "you successfully subscribed we gonna email with the latest news of our app", // plain text body
      html: "<b>thanks for joining us</b>", // html body
    });

    return res
      .status(200)
      .json({ data: null, message: "successfully subscribed" });
  } catch (error) {
    return next(error);
  }
};

export { getUserByIdController, updateUserData, subscribe };
