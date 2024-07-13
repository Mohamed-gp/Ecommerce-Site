import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
    min : 1,
    max : 99
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
    type: mongoose.Schema.ObjectId,
    ref: "category",
    required: true,
  },
  comments: [
    {
      type: [mongoose.Schema.ObjectId],
      ref: "Comment",
    },
  ],
},{timestamps : true});

export const Product =
  mongoose.models.Product || mongoose.model("product", schema);
