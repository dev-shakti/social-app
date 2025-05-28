import mongoose from "mongoose";

const storiesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storyImg: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storiesSchema);

export default Story;