import { Request, Response, NextFunction } from "express";
declare const getUserByIdController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const updateUserData: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const subscribe: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export { getUserByIdController, updateUserData, subscribe };
//# sourceMappingURL=usersController.d.ts.map