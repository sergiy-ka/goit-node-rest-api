import * as authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as avatarServices from "../services/avatarServices.js";
import * as emailService from "../services/emailService.js";
import { v4 as uuidv4 } from 'uuid';
import User from "../models/user.js";

const registerCtrl = async (req, res) => {
    const { email, password } = req.body;

    const verificationToken = uuidv4();

    const user = await authService.registerUser(email, password, verificationToken);
    if (!user) {
        throw HttpError(409, "Email in use");
    }

    try {
        await emailService.sendVerificationEmail(email, verificationToken);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }

    res.status(201).json({
        user: {
            email: user.email,
            subscription: user.subscription
        }
    });
};

const loginCtrl = async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);
    if (!result) {
        throw HttpError(401, "Email or password is wrong");
    }

    const { user, token } = result;

    if (!user.verify) {
        throw HttpError(401, "Email not verified");
    }

    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    });
};

const logoutCtrl = async (req, res) => {
    const { id } = req.user;

    const result = await authService.logoutUser(id);
    if (!result) {
        throw HttpError(401, "Not authorized");
    }

    res.status(204).send();
};

const getCurrentCtrl = async (req, res) => {
    const { id } = req.user;

    const user = await authService.getCurrentUser(id);
    if (!user) {
        throw HttpError(401, "Not authorized");
    }

    res.status(200).json({
        email: user.email,
        subscription: user.subscription
    });
};

const updateAvatarCtrl = async (req, res) => {
    if (!req.file) {
        throw HttpError(400, "Avatar file is required");
    }

    const { id } = req.user;
    const { path: tempUploadPath } = req.file;

    try {
        const avatarURL = await avatarServices.updateAvatar(id, tempUploadPath);

        await req.user.update({ avatarURL });

        res.status(200).json({ avatarURL });
    } catch (error) {
        if (error.message.includes('Unsupported file type')) {
            throw HttpError(400, error.message);
        }
        throw error;
    }
};

const verifyEmailCtrl = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ where: { verificationToken } });

    if (!user) {
        throw HttpError(404, "User not found");
    }

    await user.update({ verify: true, verificationToken: null });

    res.status(200).json({
        message: "Verification successful"
    });
};

const resendVerificationEmailCtrl = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw HttpError(400, "missing required field email");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw HttpError(404, "User not found");
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    const verificationToken = uuidv4();
    await user.update({ verificationToken });

    try {
        await emailService.sendVerificationEmail(email, verificationToken);
        res.status(200).json({
            message: "Verification email sent"
        });
    } catch (error) {
        throw HttpError(500, "Error sending email");
    }
};

export const register = ctrlWrapper(registerCtrl);
export const login = ctrlWrapper(loginCtrl);
export const logout = ctrlWrapper(logoutCtrl);
export const getCurrent = ctrlWrapper(getCurrentCtrl);
export const updateAvatar = ctrlWrapper(updateAvatarCtrl);
export const verifyEmail = ctrlWrapper(verifyEmailCtrl);
export const resendVerificationEmail = ctrlWrapper(resendVerificationEmailCtrl);