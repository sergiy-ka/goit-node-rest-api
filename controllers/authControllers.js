import * as authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const registerCtrl = async (req, res) => {
    const { email, password } = req.body;

    const user = await authService.registerUser(email, password);
    if (!user) {
        throw HttpError(409, "Email in use");
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

export const register = ctrlWrapper(registerCtrl);
export const login = ctrlWrapper(loginCtrl);
export const logout = ctrlWrapper(logoutCtrl);
export const getCurrent = ctrlWrapper(getCurrentCtrl);