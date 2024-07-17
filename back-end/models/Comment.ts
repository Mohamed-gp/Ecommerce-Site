import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", Schema);

export default Comment;
