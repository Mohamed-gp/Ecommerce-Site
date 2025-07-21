import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { verifyLogin, verifyRegister } from "../utils/joi/authValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const { error } = verifyLogin(req.body);
    if (error && error.details && error.details[0]) {
      return res.status(400).json({ message: error.details[0].message });
    } else if (error) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const user = await User.findOne({
      email,
    })
      .populate({
        path: "cart",
        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate("wishlist");

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
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env["JWT_SECRET"] as string,
      {
        expiresIn: "1y",
      }
    );
    user.password = "";

    res
      .cookie("swiftbuy-token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: process.env["NODE_ENV"] == "development" ? false : true,
        domain:
          process.env["NODE_ENV"] == "development"
            ? "localhost"
            : "production-server.tech",
      })
      .status(200)
      .json({ message: "login successfully", data: user });
    return null;
  } catch (error) {
    next(error);
    return null;
  }
};

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  try {
    if (!password) {
      return res.status(400).json({ message: "you must enter a password" });
    }
    const { error } = verifyRegister(req.body);
    if (error && error.details && error.details[0]) {
      return res.status(400).json({ message: error.details[0].message });
    } else if (error) {
      return res.status(400).json({ message: "Invalid input" });
    }
    let user = await User.findOne({
      email,
    });

    if (user) {
      return res
        .status(400)
        .json({ message: "email or password are incorrect" });
    }

    user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env["JWT_SECRET"] as string,
      { expiresIn: "1y" }
    );
    user.password = "";
    res
      .cookie("swiftbuy-token", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: process.env["NODE_ENV"] == "development" ? false : true,
        domain:
          process.env["NODE_ENV"] == "development"
            ? "localhost"
            : "production-server.tech",
      })
      .status(201)
      .json({ data: user, message: "created successfully" });
    return null;
  } catch (error) {
    next(error);
    return null;
  }
};

const googleSignIncontroller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, photoUrl } = req.body;
  try {
    let user = await User.findOne({ email })
      .populate({
        path: "cart",
        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate("wishlist");

    if (user) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env["JWT_SECRET"] as string,
        {
          expiresIn: "1y",
        }
      );
      user.password = "";
      res
        .cookie("swiftbuy-token", token, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 365,
          secure: process.env["NODE_ENV"] == "development" ? false : true,
          domain:
            process.env["NODE_ENV"] == "development"
              ? "localhost"
              : "production-server.tech",
        })
        .status(200)
        .json({ message: "login successfully", data: user });
      return null;
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
        process.env["JWT_SECRET"] as string,
        {
          expiresIn: "1y",
        }
      );

      user.password = "";
      res
        .cookie("swiftbuy-token", token, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 365,
          secure: process.env["NODE_ENV"] == "development" ? false : true,
          domain:
            process.env["NODE_ENV"] == "development"
              ? "localhost"
              : "production-server.tech",
        })
        .status(201)
        .json({ message: "user created successfully", data: user });
      return null;
    }
  } catch (error) {
    next(error);
    return null;
  }
};

const logoutController = (_req: Request, res: Response) => {
  res
    .clearCookie("swiftbuy-token", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env["NODE_ENV"] == "development" ? false : true,
      domain:
        process.env["NODE_ENV"] == "development"
          ? "localhost"
          : "production-server.tech",
    })
    .status(200)
    .json({ data: null, message: "logout successfully" });
};

export {
  loginController,
  registerController,
  googleSignIncontroller,
  logoutController,
};
