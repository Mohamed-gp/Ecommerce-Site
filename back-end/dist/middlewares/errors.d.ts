import { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
    statusCode?: number;
}
declare const notFound: (req: Request, res: Response, next: NextFunction) => void;
declare const errorHandler: (err: CustomError, req: Request, res: Response, next: NextFunction) => void;
export { notFound, errorHandler };
//# sourceMappingURL=errors.d.ts.map