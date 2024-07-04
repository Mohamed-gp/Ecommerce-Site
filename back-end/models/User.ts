import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user", // enum admin and user
    },
    provider: {
      type: String,
      required: true,
      default: "credentials",
    },
    photoUrl: {
      type: String,
      required: true,
      default:
        "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg?w=740&t=st=1720114109~exp=1720114709~hmac=a7a50bf745c8017e3f9827b2d1a5f9a37ea13abea449d49a5e83e69d8fdd4382",
    },
    cart: {
      type: Array,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", schema);

export default User;
