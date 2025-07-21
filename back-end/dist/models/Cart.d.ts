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
declare const Cart: CartModel;
export default Cart;
//# sourceMappingURL=Cart.d.ts.map