import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    interests: {
      type: [String],
      default: [],
    },
    profilePicture: {
      type: String,
      default: "", // You can store Cloudinary URL or base64 string here
    },
  },
  {
    timestamps: true, // optional: adds createdAt & updatedAt fields
  }
);

export const User = mongoose.model("User", userSchema);
export default User;
