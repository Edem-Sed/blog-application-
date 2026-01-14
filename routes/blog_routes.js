import { Router } from "express";

import { createBlog, deleteBlog, getAllBlogs, getBlogById, likeBlog, updateBlog } from "../controllers/blog_controller.js";

export const blogRouter = Router ();

blogRouter.post("/", createBlog)
blogRouter.get("/", getAllBlogs)
blogRouter.get("/:id", getBlogById)
blogRouter.put("/:id", updateBlog)
blogRouter.delete("/:id", deleteBlog)
blogRouter.patch("/:id/like", likeBlog)