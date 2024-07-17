import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { verifyLogin, verifyRegister } from "../utils/joi/authValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = verifyLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({
    email,
  }).populate({
    path: "cart",
    populate: {
      path: "product",
      model: "Product",
    },
  });
  if (!user) {
    return res.status(404).json({
      data: null,
      message: "user not found",
    });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(400).json({
      data: null,
      message: "email or password are incorrect",
    });
  }
  user.password = "";
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1y",
    }
  );
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV == "developement" ? false : true,
    })
    .status(200)
    .json({ message: "login succefully", data: user });
};

const registerController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "you must enter a password" });
  }
  const { error } = verifyRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({
    email,
  }).populate({
    path: "cart",
    populate: {
      path: "product",
      model: "Product",
    },
  });
  if (user) {
    return res.status(400).json({ message: "email or password are incorrect" });
  }

  user = await User.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
  });
  user.password = "";
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1y" }
  );
  res
    .cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
      secure: process.env.NODE_ENV == "developement" ? false : true,
      sameSite: "none",
    })
    .status(201)
    .json({ data: user, message: "created succefully" });
};

const googleSignIncontroller = async (req: Request, res: Response) => {
  const { username, email, photoUrl } = req.body;
  let user = await User.findOne({
    email,
  }).populate({
    path: "cart",
    populate: {
      path: "product",
      model: "Product",
    },
  });
  if (user) {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1y",
      }
    );
    user.password = "";
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "developement" ? false : true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite: "none",
      })
      .status(200)
      .json({ data: user, message: "login succefully" });
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    user = await User.create({
      email: email,
      photoUrl,
      username,
      password: await bcrypt.hash(generatedPassword, 10),
      provider: "google",
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1y",
      }
    );
    user.password = "";
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "developement" ? false : true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite: "none",
      })
      .status(200)
      .json({ data: user, message: "login succefully" });
  }
};

const logoutController = (req: Request, res: Response, next: NextFunction) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ data: null, message: "logout successfully" });
};

export {
  loginController,
  registerController,
  googleSignIncontroller,
  logoutController,
};
