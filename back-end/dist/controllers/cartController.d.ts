import { Request, Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
declare const addToCart: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const deleteFromCart: (req: authRequest, res: Response, next: NextFunction) => Promise<Response | void>;
export { addToCart, deleteFromCart };
//# sourceMappingURL=cartController.d.ts.map