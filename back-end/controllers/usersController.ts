import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const getUserByIdController = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => {
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
};

export { getUserByIdController };
