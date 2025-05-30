import { Request } from "express";
import { Types } from "mongoose";

export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
}

export interface DecodedUser {
  id: string;
  role: "user" | "admin";
}

export interface AuthRequest extends Request {
  user?: DecodedUser;
}

export {
  LoginInterface as loginInterface,
  RegisterInterface as registerInterface,
  AuthRequest as authRequest,
};
