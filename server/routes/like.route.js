import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { getLikesCount, toggleLike } from "../controllers/like.controller.js";

const likeRoute = express.Router();

likeRoute.post("/:postId/:userId", verifyToken, toggleLike);
likeRoute.get("/:postId/count", verifyToken, getLikesCount);

export default likeRoute;
