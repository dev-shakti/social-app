import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export async function updateUserprofile(req, res) {
  const { username, email, location } = req.body;

  const { userId } = req.params;

  if (req.userId.toString() !== userId) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (location) user.location = location;

    // Update images if uploaded
    if (req.files?.profilePic) {
      user.profilePic = req.files.profilePic[0].path;
    }

    if (req.files?.coverPic) {
      user.coverPic = req.files.coverPic[0].path;
    }

    await user.save();

    const { password, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log("error while updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getUser(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...userWithoutPassword } = user.toObject();

    const followerCount = await Follow.countDocuments({
      followingId: user._id,
    });
    const followingCount = await Follow.countDocuments({
      followerId: user._id,
    });

    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({
        user: {
          ...userWithoutPassword,
          followerCount,
          followingCount,
          isFollowing: false,
        },
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (!err) {
          const isExists = await Follow.exists({
            followerId: payload.userId,
            followingId: user._id,
          });

          return res.status(200).json({
            user: {
              ...userWithoutPassword,
              followerCount,
              followingCount,
              isFollowing: isExists ? true : false,
            },
          });
        }
      });
    }
  } catch (error) {
    console.log("error while getting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function followUser(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFollowing = await Follow.exists({
      followerId: req.userId,
      followingId: user._id,
    });

    if (isFollowing) {
      await Follow.deleteOne({ followerId: req.userId, followingId: user._id });
    } else {
      await Follow.create({ followerId: req.userId, followingId: user._id });
    }

    return res.status(201).json({
      success: true,
      message: "Followed successfully.",
    });
  } catch (error) {
    console.log("error while follow:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
