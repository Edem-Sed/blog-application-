import { Router } from "express";
import { protect } from "../middleware/auth_middleware.js";
import { upload } from "../middleware/upload_middleware.js";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, likeBlog, updateBlog } from "../controllers/blog_controller.js";

export const blogRouter = Router ();

blogRouter.post("/", protect, upload.single("image"), createBlog);

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);

blogRouter.delete("/:id", protect, deleteBlog);

blogRouter.patch("/:id/like", likeBlog);
