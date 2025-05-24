import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { updateUserprofile } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

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

export default userRoute;
