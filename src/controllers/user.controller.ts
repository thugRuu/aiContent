import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
import User from "../types/user.type";
import { generateJwtToken } from "../services/jwt";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import { error } from "console";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    // Check if user exists

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: username,
        email: email,
        role: role,
        password: hashedPassword,
      },
    });

    // Send response with JWT
    res.status(201).json({
      message: "User registered successfully",
      token: generateJwtToken({
        username: user.name,
        email: user.email,
        role: user.role,
      }),
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUser = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "desc" },
      include: {
        Authenticator: true,
        posts: true,
        profile: true,
        projects: true,
        session: true,
      },
    });
    res.json(users);
  } catch (e) {
    res.json({ error: e });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists

    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Send JWT
    res.json({
      message: "Login successful",
      token: generateJwtToken({
        username: user.name,
        email: user.email,
        role: user.role,
      }),
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
        roles: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
