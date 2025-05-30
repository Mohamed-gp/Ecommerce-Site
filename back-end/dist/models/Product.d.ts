import mongoose, { Document, Model } from "mongoose";
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    promoPercentage: number;
    images: string[];
    isFeatured: boolean;
    category: mongoose.Types.ObjectId;
    comments: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
interface ProductModel extends Model<IProduct> {
    build(attrs: Partial<IProduct>): IProduct;
}
declare const Product: ProductModel;
export default Product;
//# sourceMappingURL=Product.d.ts.map