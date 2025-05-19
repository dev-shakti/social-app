import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function register(req, res) {
  const { username, email, password } = req.body;
 
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

     const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser: userWithoutPassword,
    });
  } catch (error) {
    console.error("error while registering user", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    const {password: _, ...userWithoutPassword} = user.toObject();

    return res.status(200).json({
      success: true,
      message: "User loggedin successfully",
      user: userWithoutPassword,
    });
    
  } catch (error) {
    console.error("error while login user", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    console.error("error while logout user", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
