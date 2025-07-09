import bcrypt from "bcrypt";                // For password hashing
import { z } from "zod";                    // For input validation
import User from "../models/user_model.js";       // Mongoose User model (adjust path as needed)
import jwt from "jsonwebtoken";


const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc    Register a new user
// @route   POST /api/v1/users/signup
// @access  Public
export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      bio,
      location,
      interests,
      profilePicture,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !bio || !location)
      return res.status(400).json({ message: "All required fields must be filled." });

    if (bio.length < 20)
      return res.status(400).json({ message: "Bio should be at least 20 characters." });

    if (!Array.isArray(interests) || interests.length < 3)
      return res.status(400).json({ message: "Select at least 3 interests." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    // ✅ Use constructor + .save() to ensure password is hashed
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      bio,
      location,
      interests,
      profilePicture,
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        bio: newUser.bio,
        location: newUser.location,
        interests: newUser.interests,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};


//login 
// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({ message: "Invalid email or password." });

    // Compare passwords (IMPORTANT: await this)
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password." });

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        location: user.location,
        interests: user.interests,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({ message: "Server error during login." });
  }
};

//logout controller 
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Error in logout" });
    console.log("Error in logout", error);
  }
};
