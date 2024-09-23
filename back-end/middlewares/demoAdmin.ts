import { Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";

const demoAdmin = (req: authRequest, res: Response, next: NextFunction) => {
  if (req.user.id == "66f16f6ae8f6650bf25c28d3") {
    return res.status(403).json({
      message:
        "Demo Admin cannot perform this action is read-only in some actions",
      data: null,
    });
  }
  next();
};

export default demoAdmin;
