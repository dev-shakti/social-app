import express from "express";

import {
  addPost,
  deletePosts,
  editPost,
  getPosts,
} from "../controllers/post.controller.js";

const postRoute = express.Router();

postRoute.post("/add", addPost);
postRoute.get("/get", getPosts);
postRoute.put("/:id/edit", editPost);
postRoute.delete("/:id/delete", deletePosts);

export default postRoute;
