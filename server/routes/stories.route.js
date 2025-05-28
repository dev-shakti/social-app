import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

import upload from "../middlewares/multer.js";
import { addStory, getStories } from "../controllers/story.controller.js";

const storyRoute = express.Router();

storyRoute.post("/add", verifyToken, upload.single("file"), addStory);
storyRoute.get("/get", getStories);

export default storyRoute;
