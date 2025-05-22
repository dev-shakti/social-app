import User from "../models/user.model.js";

export async function updateUserprofile(req, res) {
  const { username, email, location } = req.body;
  const { userId } = req.params;

  if (req.userId !== userId) {
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

    await user.save();

    const {password, ...userWithoutPassword} = user.toObject();
    
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user:userWithoutPassword,
    });
  } catch (error) {
    console.error("error while updating user", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
