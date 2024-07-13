import { Request } from "express";
interface loginInterface {
  email: string;
  password: string;
}
interface registerInterface {
  username: string;
  email: string;
  password: string;
}
interface authRequest extends Request {
  user?: any;
}

export { loginInterface, registerInterface, authRequest };
