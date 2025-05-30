import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authRequest } from "../interfaces/authInterface";

const verifyToken = (
  req: authRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.cookies["swiftbuy-token"];
  if (token) {
    try {
      const decodedPayload = jwt.verify(
        token,
        process.env["JWT_SECRET"] as string
      );
      req.user = decodedPayload as any;
      return next();
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

const verifyUser = (
  req: authRequest,
  res: Response,
  next: NextFunction
): void => {
  verifyToken(req, res, () => {
    if (req.user && req.user.id != req.params["id"]) {
      res.status(403).json({
        data: null,
        message: "access denied,you must be the user himself",
      });
      return;
    }
    next();
  });
};

const verifyAdminAndUser = (
  req: authRequest,
  res: Response,
  next: NextFunction
): void => {
  verifyToken(req, res, () => {
    if (
      req.user &&
      (req.user.role == "admin" || req.user.id == req.params["id"])
    ) {
      next();
      return;
    }
    res
      .status(403)
      .json({ data: null, message: "access denied,only admin himself" });
  });
};

const verifyAdmin = (
  req: authRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  if (!req.user || req.user.role != "admin") {
    return res
      .status(403)
      .json({ data: null, message: "access denied,only admin himself" });
  }
  next();
};

export { verifyToken, verifyUser, verifyAdminAndUser, verifyAdmin };
