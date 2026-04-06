import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { jwtSecret } from "../config/env.js";

const router = express.Router();

const createToken = (id) =>
  jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });

const buildAuthResponse = (user) => ({
  token: createToken(user._id),
  user: {
    id: user._id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    country: user.country,
    hobby: user.hobby,
    role: user.role,
  },
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, username, email, password, country, hobby } = req.body;

    if (!fullName || !username || !email || !password || !country || !hobby) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      country,
      hobby,
      role: "user",
    });

    res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: "Failed to sign up user" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const loginValue = emailOrUsername?.trim();

    if (!loginValue || !password) {
      return res
        .status(400)
        .json({ message: "Email or username and password are required" });
    }

    const user = await User.findOne({
      $or: [
        { email: loginValue.toLowerCase() },
        { username: loginValue },
        { fullName: loginValue },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(buildAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: "Failed to sign in user" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

router.delete("/account", authMiddleware, async (req, res) => {
  try {
    const { password } = req.body;

    // Only allow normal users to delete their account, not admins
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot delete their account" });
    }

    // Verify password before deletion
    if (!password) {
      return res.status(400).json({ message: "Password is required to delete account" });
    }

    const isPasswordValid = await bcrypt.compare(password, req.user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Delete all portfolios associated with this user first
    await Portfolio.deleteMany({ user: req.user._id });

    // Delete the user account
    await User.findByIdAndDelete(req.user._id);

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete account" });
  }
});

export default router;
