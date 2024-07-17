import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import Product from "../models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // price and info about the product come forom the server and client send only ids to prevent user to put 0 dollar
  let { cart } = req.body;
  try {
    const lineItems = await Promise.all(
      cart.map(async (ele: any) => {
        const product = await Product.findById(ele.product._id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100, // Stripe expects the amount in cents
          },
          quantity: ele.quantity,
        };
      })
    );
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", // mode payment or subscription or a setup
      success_url: process.env.SUCCESS_FRONT_URL,
      cancel_url: process.env.CANCEL_FRONT_URL,
      line_items: lineItems,
    });

    console.log(session)
    res.status(200).json({
      message: "checkout session created successfull",
      data: session.url,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { createPayment };
