import mongoose, { model, Schema } from "mongoose"

export const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },

  content: {
    type: String,
    required: true,
    minlength: 20
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  image: {
    type: String, // image URL
    default: null
  },

  category: {
    type: String,
    enum: ["Tech", "Education", "Lifestyle", "Business", "Other"],
    default: "Other"
  },

  tags: [
    {
      type: String,
      lowercase: true
    }
  ],

  isPublished: {
    type: Boolean,
    default: false
  },

  likes: {
    type: Number,
    default: 0
  },

  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });
export const Blog = model('Blog', blogSchema);