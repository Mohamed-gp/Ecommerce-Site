import { Request, Response, NextFunction } from "express";
declare const createOrder: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const getAllOrders: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const getUserOrders: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const getOrderById: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const updateOrderStatus: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const getRevenueStats: (_req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const getOrderStats: (_req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export { createOrder, getAllOrders, getUserOrders, getOrderById, updateOrderStatus, getRevenueStats, getOrderStats, };
//# sourceMappingURL=orderController.d.ts.map