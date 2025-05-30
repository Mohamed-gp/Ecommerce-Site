import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  provider: "credentials" | "google";
  photoUrl: string;
  cart: mongoose.Types.ObjectId[];
  wishlist: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  isSubscribe: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends Model<IUser> {
  build(attrs: Partial<IUser>): IUser;
}

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
      enum: ["user", "admin"],
      default: "user",
    },
    provider: {
      type: String,
      required: true,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    photoUrl: {
      type: String,
      required: true,
      default:
        "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg",
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isSubscribe: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: any, ret: { [key: string]: any }) {
        ret["id"] = ret["_id"];
        delete ret["_id"];
        delete ret["__v"];
      },
    },
  }
);

schema.statics["build"] = (attrs: Partial<IUser>) => {
  return new User(attrs);
};

const User = mongoose.model<IUser, UserModel>("User", schema);

export default User;
