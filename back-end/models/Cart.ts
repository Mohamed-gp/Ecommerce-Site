import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
});
const Cart = mongoose.models.Cart || mongoose.model("cart", cartSchema);
export default Cart;
