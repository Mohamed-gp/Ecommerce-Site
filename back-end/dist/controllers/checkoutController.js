"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const Product_1 = __importDefault(require("../models/Product"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
});
const createPayment = async (req, res, next) => {
    // price and info about the product come forom the server and client send only ids to prevent user to put 0 dollar
    try {
        let { cart } = req.body;
        const lineItems = await Promise.all(cart.map(async (ele) => {
            const product = await Product_1.default.findById(ele.product._id);
            if (!product) {
                throw new Error(`Product with id ${ele.product._id} not found`);
            }
            const price = product.price || 0;
            const promoPercentage = product.promoPercentage || 0;
            let amount = price * 100 * (1 - promoPercentage / 100);
            amount = Math.ceil(amount);
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name || "Product",
                    },
                    unit_amount: amount, // Stripe expects the amount in cents
                },
                quantity: ele.quantity,
            };
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment", // mode payment or subscription or a setup
            success_url: process.env.NODE_ENV == "production"
                ? process.env.PRODUCTION_SUCCESS_FRONT_URL
                : process.env.DEV_SUCCESS_FRONT_URL,
            cancel_url: process.env.NODE_ENV == "production"
                ? process.env.PRODUCTION_CANCEL_FRONT_URL
                : process.env.DEV_CANCEL_FRONT_URL,
            line_items: lineItems,
        });
        res.status(200).json({
            message: "checkout session created successfull",
            data: session.url,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Payment processing failed" });
        next(error);
    }
};
exports.createPayment = createPayment;
//# sourceMappingURL=checkoutController.js.map