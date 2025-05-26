import User from "../models/user.model.js";

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

    const {password, ...userWithoutPassword} = user.toObject();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user:userWithoutPassword,
    });
  } catch (error) {
    console.log("error while updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getUser(req,res){
  const {userId}=req.params;
  try {
     const user=await User.findOne({_id:userId})
       if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
   
    const {password, ...userWithoutPassword} = user.toObject();

    return res.status(200).json({
      success: true,
      user:userWithoutPassword,
    });

  } catch (error) {
     console.log("error while getting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


