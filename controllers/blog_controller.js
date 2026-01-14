import { Blog } from "../models/blog_models.js";

// Create a Blog
export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      message: "Blog created successfully",
      blog
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
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
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog
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
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully"
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



