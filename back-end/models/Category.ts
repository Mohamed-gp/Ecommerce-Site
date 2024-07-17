import { required } from "joi";
import mongoose from "mongoose";

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

const Category = mongoose.models.Category || mongoose.model("Category", Schema);

export default Category;
