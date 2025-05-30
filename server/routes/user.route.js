import express from "express";
import {
  followUser,
  getUser,
  updateUserprofile,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const userRoute = express.Router();

userRoute.put(
  "/:userId/update",
  verifyToken,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
  ]),
  updateUserprofile
);
userRoute.get("/:userId", getUser);
userRoute.post("/follow/:userId",verifyToken, followUser);

export default userRoute;
