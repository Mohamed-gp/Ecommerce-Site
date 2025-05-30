import mongoose, { Document } from "mongoose";
export interface ICoupon extends Document {
    code: string;
    discount: number;
    expiresAt: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Coupon: mongoose.Model<any, {}, {}, {}, any, any>;
export default Coupon;
//# sourceMappingURL=Coupon.d.ts.map