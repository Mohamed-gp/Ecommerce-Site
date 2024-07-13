import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const verifyObjectId = (req: Request, res: Response, next: NextFunction) => {
  //   if (!isObjectIdOrHexString(req.params.id)) {
  //     return res.status(400).json({ data: null, message: "ivalid id" });
  //   }
  //   next();
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "invalid id" });
  }
  next();
};

export default verifyObjectId;
