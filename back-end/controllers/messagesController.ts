import { Request, Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
import Message from "../models/Message";
import User from "../models/User";
import { Types } from "mongoose";

// Send a message (for users and guests)
const sendMessage = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { subject, message, userId, guestName, guestEmail } = req.body;

    // Validate required fields
    if (!subject || !message) {
      return res.status(400).json({
        message: "Subject and message are required",
        data: null,
      });
    }

    // Handle registered user message
    if (userId) {
      const user = await User.findById(new Types.ObjectId(userId));
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          data: null,
        });
      }

      const newMessage = await Message.build({
        subject,
        message,
        userId: new Types.ObjectId(userId),
        isRead: false,
      } as any).save();

      const populatedMessage = await Message.findById(newMessage._id).populate({
        path: "userId",
        select: "username email photoUrl",
      });

      return res.status(201).json({
        message: "Message sent successfully",
        data: populatedMessage,
      });
    }
    // Handle guest message
    else if (guestName && guestEmail) {
      const newMessage = await Message.build({
        subject,
        message,
        guestName,
        guestEmail,
        isRead: false,
      } as any).save();

      return res.status(201).json({
        message: "Message sent successfully",
        data: newMessage,
      });
    }
    // Reject invalid message
    else {
      return res.status(400).json({
        message:
          "Either userId or guest information (name and email) must be provided",
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};

// Get all messages (for admin)
const getAllMessages = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const messages = await Message.find()
      .populate({
        path: "userId",
        select: "username email photoUrl",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    return next(error);
  }
};

// Get unread messages count (for admin)
const getUnreadMessagesCount = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const count = await Message.countDocuments({ isRead: false });

    return res.status(200).json({
      message: "Unread messages count fetched successfully",
      data: count,
    });
  } catch (error) {
    return next(error);
  }
};

// Mark message as read (for admin)
const markMessageAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const message = await Message.findById(new Types.ObjectId(id));
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
  } catch (error) {
    return next(error);
  }
};

// Delete message (for admin)
const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(new Types.ObjectId(id));
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
  } catch (error) {
    return next(error);
  }
};

export {
  sendMessage,
  getAllMessages,
  getUnreadMessagesCount,
  markMessageAsRead,
  deleteMessage,
};
