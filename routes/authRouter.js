import express from "express";
import { register, login, logout, getCurrent } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrent);

export default authRouter;