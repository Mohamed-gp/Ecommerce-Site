import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
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
  },
  Images: {
    type: Array,
    required: true,
  },
  exclusive: {
    type: Boolean,
    required: true,
    default: false,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Array,
  },
  comments: {
    type: Array,
  },
});

export const Product =
  mongoose.models.product || mongoose.model("product", schema);
