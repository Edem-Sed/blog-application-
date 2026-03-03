import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 5
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

export const User = model("User", userSchema);