"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = exports.updateUserData = exports.getUserByIdController = void 0;
const User_1 = __importDefault(require("../models/User"));
const cleanUpload_1 = __importDefault(require("../utils/fs/cleanUpload"));
const userValidation_1 = require("../utils/joi/userValidation");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const getUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id);
        if (!user) {
            return res
                .status(404)
                .json({ data: null, message: "no user found with this email" });
        }
        user.password = "";
        user.cart = [];
        return res.status(200).json({
            data: user,
            message: "user found",
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getUserByIdController = getUserByIdController;
const updateUserData = async (req, res, next) => {
    const { username } = req.body;
    try {
        if (!username && !req.file) {
            return res
                .status(400)
                .json({ data: null, message: "enter one of the inputs" });
        }
        const { error } = (0, userValidation_1.verifyUpdateUser)(req.body);
        if (error && error.details && error.details[0]) {
            return res
                .status(400)
                .json({ message: error.details[0].message, data: null });
        }
        const file = req.file;
        let user = await User_1.default.findById(req.params["id"])
            .populate({
            path: "cart",
            populate: {
                path: "product",
                model: "Product",
            },
        })
            .populate("wishlist");
        if (!user) {
            return res.status(404).json({ data: null, message: "User not found" });
        }
        if (file) {
            try {
                const picture = file.path;
                const uploadedPicture = await cloudinary_1.default.uploader.upload(picture);
                if (uploadedPicture) {
                    // Picture uploaded successfully
                    user.photoUrl = uploadedPicture.secure_url;
                }
                (0, cleanUpload_1.default)();
            }
            catch (error) {
                return next(error);
            }
        }
        if (username != "") {
            user.username = username;
        }
        await user.save();
        user.password = "";
        return res
            .status(201)
            .json({ message: "user info updated successfull", data: user });
    }
    catch (error) {
        return next(error);
    }
};
exports.updateUserData = updateUserData;
const subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "you must login with this email first with our app",
                data: null,
            });
        }
        if (user.isSubscribe) {
            return res
                .status(404)
                .json({ message: "you already subscribed", data: null });
        }
        user.isSubscribe = true;
        await user.save();
        const transporter = nodemailer_1.default.createTransport({
            // host: "smtp.ethereal.email",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env["EMAIL"],
                pass: process.env["EMAIL_PASS_KEY"],
            },
        });
        // send mail with defined transport object
        await transporter.sendMail({
            from: process.env["EMAIL"], // sender address
            to: email, // list of receivers
            subject: "SwiftBuy Subscription ✔", // Subject line
            text: "you successfully subscribed we gonna email with the latest news of our app", // plain text body
            html: "<b>thanks for joining us</b>", // html body
        });
        return res
            .status(200)
            .json({ data: null, message: "successfully subscribed" });
    }
    catch (error) {
        return next(error);
    }
};
exports.subscribe = subscribe;
//# sourceMappingURL=usersController.js.map