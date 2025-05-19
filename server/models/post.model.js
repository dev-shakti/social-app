import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    desc: { type: String, required: true },
    postImg: { type: String,default:""},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
