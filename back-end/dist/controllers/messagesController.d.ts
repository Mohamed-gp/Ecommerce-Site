import { Request, Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
declare const sendMessage: (req: authRequest, res: Response, next: NextFunction) => Promise<Response | void>;
declare const getAllMessages: (_req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const getUnreadMessagesCount: (_req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const markMessageAsRead: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const deleteMessage: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export { sendMessage, getAllMessages, getUnreadMessagesCount, markMessageAsRead, deleteMessage, };
//# sourceMappingURL=messagesController.d.ts.map