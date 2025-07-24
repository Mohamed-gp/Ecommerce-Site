import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const verifyObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  // Get all parameter values and check each one
  const paramValues = Object.values(req.params);
  
  for (const paramValue of paramValues) {
    if (paramValue && !mongoose.Types.ObjectId.isValid(paramValue)) {
      return res.status(400).json({ 
        message: "Invalid ObjectId format",
        data: null 
      });
    }
  }
  
  // Also check if any parameter is empty or undefined
  for (const [key, value] of Object.entries(req.params)) {
    if (!value || value.trim() === '') {
      return res.status(400).json({ 
        message: `Missing required parameter: ${key}`,
        data: null 
      });
    }
  }
  
  return next();
};

export default verifyObjectId;
