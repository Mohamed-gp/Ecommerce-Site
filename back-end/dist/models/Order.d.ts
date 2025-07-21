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
declare const Order: OrderModel;
export default Order;
//# sourceMappingURL=Order.d.ts.map