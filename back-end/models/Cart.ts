import mongoose, { Document, Model } from "mongoose";

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CartModel extends Model<ICart> {
  build(attrs: Partial<ICart>): ICart;
}

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: any, ret: { [key: string]: any }) {
        ret["id"] = ret["_id"];
        delete ret["_id"];
        delete ret["__v"];
      },
    },
  }
);

cartSchema.statics["build"] = (attrs: Partial<ICart>) => {
  return new Cart(attrs);
};

const Cart = mongoose.model<ICart, CartModel>("Cart", cartSchema);

export default Cart;
