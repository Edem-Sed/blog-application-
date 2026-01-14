import { model, Schema} from "mongoose"

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
      type: String,
      default: "Admin"
    },

    image: {
      type: String, // image URL
      default: ""
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
}, {timestamps: true});
export const Blog = model('Blog', blogSchema);