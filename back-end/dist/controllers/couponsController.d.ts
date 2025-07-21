import { Request, Response, NextFunction } from "express";
declare const getAllCoupons: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const createCoupon: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const deleteCoupon: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const validateCoupon: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export { getAllCoupons, createCoupon, deleteCoupon, validateCoupon };
//# sourceMappingURL=couponsController.d.ts.map