import { NextFunction, Request, Response } from "express";
declare const loginController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | null>;
declare const registerController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | null>;
declare const googleSignIncontroller: (req: Request, res: Response, next: NextFunction) => Promise<null>;
declare const logoutController: (_req: Request, res: Response) => void;
export { loginController, registerController, googleSignIncontroller, logoutController, };
//# sourceMappingURL=authController.d.ts.map