import express from "express";

import {
  addPost,
  deletePosts,
  editPost,
  getPosts,
  getPostsByUser,

} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../middlewares/multer.js";

const postRoute = express.Router();

postRoute.post("/add", verifyToken, upload.single("file"), addPost);
postRoute.get("/get", getPosts);
postRoute.get("/:userId/get", getPostsByUser);
postRoute.put("/:id/edit", verifyToken, editPost);
postRoute.delete("/:id/delete", verifyToken, deletePosts);

export default postRoute;
