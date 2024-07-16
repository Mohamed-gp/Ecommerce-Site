import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, userId } = req.body;
  const user = await User.findById(userId);
  console.log(user);
  //   const isExist = user.cart.find((ele) => ele.product._id == productId);
  //   if (isExist) {
  //     const newCart = user.cart.map(ele => {
  //         if (ele._id) {

  //         }
  //     })
  //   } else {
  //   }
};

export { addToCart };
