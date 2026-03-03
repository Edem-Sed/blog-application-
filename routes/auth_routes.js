import { Router } from "express";
import { signUp, signIn } from "../controllers/auth_controller.js";

export const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);