import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const verifyObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  //   if (!isObjectIdOrHexString(req.params.id)) {
  //     return res.status(400).json({ data: null, message: "ivalid id" });
  //   }
  //   next();
  const id = req.params["id"];
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id" });
  }
  return next();
};

export default verifyObjectId;
