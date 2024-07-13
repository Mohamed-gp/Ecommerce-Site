import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authRequest } from "../interfaces/authInterface";

const verifyToken = (req: authRequest, res: Response, next: NextFunction) => {
  const token = req.cookies["token"];
  if (token) {
    try {
      const decodedPayload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
      req.user = decodedPayload;
      next();
    } catch (error) {
      return res
        .status(403)
        .json({ data: null, messsage: "access denied, invalid token" });
    }
  } else {
    return res.status(403).json({
      data: null,
      message: "access denied,no token provided",
    });
  }
};

const verifyUser = (req: authRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.id != req.params.id) {
      return res.status(403).json({
        data: null,
        message: "access denied,you must be the user himself",
      });
    } else {
      next();
    }
  });
};

const verifyAdminAndUser = (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.role == "admin" || req.user.id == req.params.id) {
      next();
    } else {
      return res
        .status(403)
        .json({ data: null, message: "access denied,only admin himself" });
    }
  });
};

const verifyAdmin = (req: authRequest, res: Response, next: NextFunction) => {
  if (req.user.role != "admin") {
    return res
      .status(403)
      .json({ data: null, message: "access denied,only admin himself" });
  }
  next();
};

export { verifyToken, verifyUser, verifyAdminAndUser, verifyAdmin };
