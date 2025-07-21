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

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    promoPercentage: {
      type: Number,
      required: true,
      min: 1,
      max: 99,
    },
    images: {
      type: [String],
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

schema.statics["build"] = (attrs: Partial<IProduct>) => {
  return new Product(attrs);
};

const Product =
  (mongoose.models["Product"] as ProductModel) ||
  mongoose.model<IProduct, ProductModel>("Product", schema);

export default Product;
