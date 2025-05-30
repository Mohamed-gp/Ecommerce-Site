import mongoose, { Document } from "mongoose";
export interface IComment extends Document {
    content: string;
    rate: number;
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const Comment: mongoose.Model<any, {}, {}, {}, any, any>;
export default Comment;
//# sourceMappingURL=Comment.d.ts.map