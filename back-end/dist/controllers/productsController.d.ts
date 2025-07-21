import { NextFunction, Request, Response } from "express";
import { authRequest } from "../interfaces/authInterface";
/**
 *
 * @method GET
 * @route /api/products?query
 * @access public
 * @desc get products
 *
 */
declare const getAllProducts: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
/**
 *
 * @method GET
 * @route /api/products/:id
 * @access public
 * @desc get products
 *
 */
declare const getProduct: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const createProduct: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const deleteProduct: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const getFeaturedProducts: (_req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
/**
 * @method GET
 * @route /api/products/new-arrivals
 * @access public
 * @desc get new arrival products (latest 8 products)
 */
declare const getNewArrivals: (_req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
declare const toggleWishlist: (req: authRequest, res: Response, next: NextFunction) => Promise<Response | void>;
export { getAllProducts, createProduct, getProduct, deleteProduct, getFeaturedProducts, toggleWishlist, getNewArrivals, };
//# sourceMappingURL=productsController.d.ts.map