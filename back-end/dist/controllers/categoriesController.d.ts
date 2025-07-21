import { NextFunction, Request, Response } from "express";
/**
 *
 * @method GET
 * @route /api/categories
 * @access public
 * @desc get products
 *
 */
declare const getAllCategories: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 *
 * @method POST
 * @route /api/categories
 * @access Private
 * @desc get products
 *
 */
declare const createCategory: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 *
 * @method delete
 * @route /api/categories/:id
 * @access public
 * @desc get products
 *
 */
declare const deleteCategory: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export { getAllCategories, createCategory, deleteCategory };
//# sourceMappingURL=categoriesController.d.ts.map