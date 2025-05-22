import Like from "../models/like.model.js";

export async function toggleLike(req, res) {
  const { postId, userId } = req.params;

  try {
    const existingLike = await Like.findOne({ userId, postId });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
    } else {
      await Like.create({ userId, postId });
    }

    const count = await Like.countDocuments({ postId });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getLikesCount(req, res) {
  const { postId } = req.params;

  try {
    const count = await Like.countDocuments({ postId });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
