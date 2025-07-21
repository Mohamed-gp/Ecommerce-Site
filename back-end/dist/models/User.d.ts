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
declare const User: UserModel;
export default User;
//# sourceMappingURL=User.d.ts.map