import { DecodedUser } from "../interfaces/authInterface";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
      isDemo?: boolean;
    }
  }
}

export {};
