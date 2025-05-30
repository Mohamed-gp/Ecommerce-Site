import { Request, Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
declare const getAdmins: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const addAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const deleteAdmin: (req: authRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getUsersCount: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getProductsCount: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getCategoriesCount: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getCommentsCount: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getDashboardAnalytics: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getAllUsers: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const updateUserRole: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getAllComments: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const deleteCommentAsAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * @method GET
 * @route /api/admin/products
 * @access admin
 * @desc get all products for admin management
 */
declare const getAllProductsForAdmin: (_req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export { getAdmins, addAdmin, deleteAdmin, getUsersCount, getCategoriesCount, getProductsCount, getCommentsCount, getDashboardAnalytics, getAllUsers, updateUserRole, deleteUser, getAllComments, deleteCommentAsAdmin, getAllProductsForAdmin, };
//# sourceMappingURL=adminController.d.ts.map