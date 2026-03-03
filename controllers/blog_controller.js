import { Blog } from "../models/blog_models.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier"

// Create a Blog
export const createBlog = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blog_images" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await streamUpload();
      imageUrl = result.secure_url;
    }

    const blog = await Blog.create({
      ...req.body,
      image: imageUrl,
      author: req.user.id
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//Get all Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json({
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//Get one Blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    // increase views
    blog.views += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({
      message: "Invalid blog ID"
    });
  }
};

// Update a Blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    // Update text fields manually
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;

    // If a new image URL is sent (for example from Cloudinary)
    if (req.body.image) {
      blog.image = req.body.image;
    }

    const updatedBlog = await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Delete a Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    // If admin → allow
    if (req.user.role === "admin") {
      await blog.deleteOne();

      return res.status(200).json({
        message: "Blog deleted by admin"
      });
    }

    // If user → check ownership
    if (blog.author.toString() === req.user.id) {
      await blog.deleteOne();

      return res.status(200).json({
        message: "Your blog deleted successfully"
      });
    }

    // Otherwise deny
    return res.status(403).json({
      message: "You are not allowed to delete this blog"
    });

  } catch (error) {
    res.status(400).json({
      message: "Invalid blog ID"
    });
  }
};

// Like a Blog 
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    blog.likes += 1;
    await blog.save();

    res.status(200).json({
      message: "Blog liked",
      likes: blog.likes
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid blog ID"
    });
  }
};



