"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.markMessageAsRead = exports.getUnreadMessagesCount = exports.getAllMessages = exports.sendMessage = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = require("mongoose");
// Send a message (for users)
const sendMessage = async (req, res, next) => {
    try {
        const { subject, message, userId } = req.body;
        if (!subject || !message || !userId) {
            return res.status(400).json({
                message: "Subject, message, and userId are required",
                data: null,
            });
        }
        const user = await User_1.default.findById(new mongoose_1.Types.ObjectId(userId));
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                data: null,
            });
        }
        const newMessage = await Message_1.default.build({
            subject,
            message,
            userId: new mongoose_1.Types.ObjectId(userId),
            isRead: false,
        }).save();
        const populatedMessage = await Message_1.default.findById(newMessage._id).populate({
            path: "userId",
            select: "username email photoUrl",
        });
        return res.status(201).json({
            message: "Message sent successfully",
            data: populatedMessage,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.sendMessage = sendMessage;
// Get all messages (for admin)
const getAllMessages = async (_req, res, next) => {
    try {
        const messages = await Message_1.default.find()
            .populate({
            path: "userId",
            select: "username email photoUrl",
        })
            .sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Messages fetched successfully",
            data: messages,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllMessages = getAllMessages;
// Get unread messages count (for admin)
const getUnreadMessagesCount = async (_req, res, next) => {
    try {
        const count = await Message_1.default.countDocuments({ isRead: false });
        return res.status(200).json({
            message: "Unread messages count fetched successfully",
            data: count,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getUnreadMessagesCount = getUnreadMessagesCount;
// Mark message as read (for admin)
const markMessageAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await Message_1.default.findById(new mongoose_1.Types.ObjectId(id));
        if (!message) {
            return res.status(404).json({
                message: "Message not found",
                data: null,
            });
        }
        message.isRead = true;
        await message.save();
        return res.status(200).json({
            message: "Message marked as read",
            data: message,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.markMessageAsRead = markMessageAsRead;
// Delete message (for admin)
const deleteMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await Message_1.default.findByIdAndDelete(new mongoose_1.Types.ObjectId(id));
        if (!message) {
            return res.status(404).json({
                message: "Message not found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Message deleted successfully",
            data: null,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteMessage = deleteMessage;
//# sourceMappingURL=messagesController.js.map