import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    coverPic: { type: String, default:"" },
    profilePic: { type: String, default:"" },
    location: { type: String, default:""},
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
