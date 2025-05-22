import express from "express";

import {
  addPost,
  deletePosts,
  editPost,
  getPosts,
  getPostsByUser,

} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const postRoute = express.Router();

postRoute.post("/add", verifyToken, addPost);
postRoute.get("/get", getPosts);
postRoute.get("/:userId/get", getPostsByUser);
postRoute.put("/:id/edit", verifyToken, editPost);
postRoute.delete("/:id/delete", verifyToken, deletePosts);

export default postRoute;
