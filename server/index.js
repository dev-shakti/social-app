import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";
import likeRoute from "./routes/like.route.js";
import userRoute from "./routes/user.route.js";
import storyRoute from "./routes/stories.route.js";
dotenv.config();

//initialize app
const app = express();

//loading env variables
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

//routes
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);
app.use("/api/likes",likeRoute);
app.use("/api/stories",storyRoute);


//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected successfully");

    //listening to app
    app.listen(PORT, () => {
      console.log(`app is listening to port:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
