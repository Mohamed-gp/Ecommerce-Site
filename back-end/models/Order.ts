import mongoose, { Document, Model } from "mongoose";

interface OrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  paymentMethod: string;
  paymentId?: string;
  shippingAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderModel extends Model<IOrder> {
  build(attrs: Partial<IOrder>): IOrder;
}

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    shippingAddress: {
      type: String,
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

orderSchema.statics["build"] = (attrs: Partial<IOrder>) => {
  return new Order(attrs);
};

const Order = mongoose.model<IOrder, OrderModel>("Order", orderSchema);

export default Order;
