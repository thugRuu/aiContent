import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
import User from "../types/user.type";
import { generateJwtToken } from "../services/jwt";


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, roles } = req.body;
    console.log(req.body)

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      roles,
    });

    // Send response with JWT
    res.status(201).json({
      message: "User registered successfully",
      token: generateJwtToken({
        username: user.username,
        email: user.email,
        roles: user.roles,
      }),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Send JWT
    res.json({
      message: "Login successful",
      token: generateJwtToken({
        username: user.username,
        email: user.email,
        roles: user.roles,
      }),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
