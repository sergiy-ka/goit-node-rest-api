import express from "express";
import {
    register,
    login,
    logout,
    getCurrent,
    updateAvatar,
    verifyEmail,
    resendVerificationEmail
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema, emailSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrent);
authRouter.patch("/avatars", authenticate, upload.single('avatar'), updateAvatar);
authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/verify", validateBody(emailSchema), resendVerificationEmail);

export default authRouter;