import Comment from "../models/comment.model.js";

export async function addComment(req, res) {
  const { desc } = req.body;
  const { postId, userId } = req.params;
  try {
    const newComment = new Comment({
      desc,
      postId,
      userId,
    });

    await newComment.save();
    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      Comment: newComment,
    });
  } catch (error) {
    console.error("error while adding comment", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getComments(req, res) {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).populate(
      "userId",
      "username profilePic"
    );

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("error while getting comments", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getCommentsCount(req, res) {
  const { postId } = req.params;
  try {
    const count = await Comment.countDocuments({ postId });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("error while getting count", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
