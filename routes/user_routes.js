import { Router } from "express";
import { protect } from "../middleware/auth_middleware.js";
import { isAdmin } from "../middleware/admin_middleware.js";

import { deleteUser } from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.delete("/:id", protect, isAdmin, deleteUser);