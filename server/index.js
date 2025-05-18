import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
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
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

//routes

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
