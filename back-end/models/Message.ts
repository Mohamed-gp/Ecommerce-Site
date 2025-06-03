import mongoose, { Document, Model } from "mongoose";

export interface IMessage extends Document {
  subject: string;
  message: string;
  userId?: mongoose.Types.ObjectId; // Make userId optional
  guestName?: string; // Add guest name field
  guestEmail?: string; // Add guest email field
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MessageModel extends Model<IMessage> {
  build(attrs: Partial<IMessage>): IMessage;
}

const messageSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Changed to false so it's optional
    },
    // New fields for guests
    guestName: {
      type: String,
      required: false,
    },
    guestEmail: {
      type: String,
      required: false,
    },
    isRead: {
      type: Boolean,
      default: false,
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

messageSchema.statics["build"] = (attrs: Partial<IMessage>) => {
  return new Message(attrs);
};

const Message = mongoose.model<IMessage, MessageModel>(
  "Message",
  messageSchema
);

export default Message;
