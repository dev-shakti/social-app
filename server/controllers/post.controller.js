import Post from "../models/post.model.js";

export async function addPost(req, res) {
  const { desc } = req.body;

  if (!desc) {
    return res.status(400).json({
      success: false,
      message: "Description is required",
    });
  }

  try {
    const newPost = new Post({
      desc,
      userId: req.userId,
    });

    if (req.file) {
      newPost.postImg = req.file.path;
    }

    await newPost.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    console.error("error while add post", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("userId", "username profilePic");
    return res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("error while getting posts", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function editPost(req, res) {
  try {
  } catch (error) {
    console.error("error while updating post", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function deletePosts(req, res) {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Only allow deletion if user owns the post
    if (post.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this post" });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("error while deleting post", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getPostsByUser(req, res) {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "username profilePic coverPic");
    return res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("error while getting posts", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
