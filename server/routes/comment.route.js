import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addComment,
  getComments,
  getCommentsCount,
} from "../controllers/comment.controller.js";

const commentRoute = express.Router();

commentRoute.post("/:postId/:userId/add", verifyToken, addComment);
commentRoute.get("/:postId/get", getComments);
commentRoute.get("/:postId/count", getCommentsCount);

export default commentRoute;
