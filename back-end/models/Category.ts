import mongoose, { Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model<ICategory>("Category", Schema);

export default Category;
