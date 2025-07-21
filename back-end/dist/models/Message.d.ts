import mongoose, { Document, Model } from "mongoose";
export interface IMessage extends Document {
    subject: string;
    message: string;
    userId?: mongoose.Types.ObjectId;
    guestName?: string;
    guestEmail?: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}
interface MessageModel extends Model<IMessage> {
    build(attrs: Partial<IMessage>): IMessage;
}
declare const Message: MessageModel;
export default Message;
//# sourceMappingURL=Message.d.ts.map