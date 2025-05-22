import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { updateUserprofile } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.put("/:userId/update", verifyToken, updateUserprofile);

export default userRoute;
