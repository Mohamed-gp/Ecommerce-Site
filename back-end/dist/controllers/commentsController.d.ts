import { Request, Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
declare const addComment: (req: authRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getComments: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const deleteComment: (req: authRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export { addComment, getComments, deleteComment };
//# sourceMappingURL=commentsController.d.ts.map