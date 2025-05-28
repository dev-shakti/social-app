import Story from "../models/stories.model.js";

export async function addStory(req, res) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Story image is required",
    });
  }
 
  try {
    const newStory = new Story({ userId: req.userId, storyImg: req.file.path });

    await newStory.save();

    return res.status(201).json({
      success: true,
      message: "story added successfully",
      story: newStory,
    });
  } catch (error) {
    console.error("error while add story", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getStories(req, res) {
  try {
    const stories = await Story.find({})
      .sort({ createdAt: -1 })
      .populate("userId", "username profilePic");

    return res.status(200).json({
      success: true,
      stories,
    });
  } catch (error) {
    console.error("error while get stories", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
