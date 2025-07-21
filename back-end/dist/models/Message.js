"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    toJSON: {
        transform(_doc, ret) {
            ret["id"] = ret["_id"];
            delete ret["_id"];
            delete ret["__v"];
        },
    },
});
messageSchema.statics["build"] = (attrs) => {
    return new Message(attrs);
};
const Message = mongoose_1.default.model("Message", messageSchema);
exports.default = Message;
//# sourceMappingURL=Message.js.map