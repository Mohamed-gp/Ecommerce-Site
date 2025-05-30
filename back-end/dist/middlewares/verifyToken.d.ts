import { Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
declare const verifyToken: (req: authRequest, res: Response, next: NextFunction) => Response | void;
declare const verifyUser: (req: authRequest, res: Response, next: NextFunction) => void;
declare const verifyAdminAndUser: (req: authRequest, res: Response, next: NextFunction) => void;
declare const verifyAdmin: (req: authRequest, res: Response, next: NextFunction) => Response | void;
export { verifyToken, verifyUser, verifyAdminAndUser, verifyAdmin };
//# sourceMappingURL=verifyToken.d.ts.map