import bcrypt from "bcrypt";                // For password hashing
import { z } from "zod";                    // For input validation
import User from "../models/user_model.js";       // Mongoose User model (adjust path as needed)
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    bio,
    location,
    interests,
    profilePicture = "", // Optional
  } = req.body;

  // Zod schema validation
  const userSchema = z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(3, "Last name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    bio: z.string().min(20, "Bio must be at least 20 characters"),
    location: z.string().min(2, "Location is required"),
    interests: z.array(z.string()).min(3, "Select at least 3 interests"),
    profilePicture: z.string().optional(),
  });

  const validatedData = userSchema.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      errors: validatedData.error.issues.map((err) => err.message),
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: ["User already exists"] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      bio,
      location,
      interests,
      profilePicture,
    });

    await newUser.save();

    // Optional: generate token here
    res.status(201).json({ message: "Signup succeeded", token: "dummy-token", user: newUser });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ errors: ["Internal server error"] });
  }
};


//login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Use User model, not Admin
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ errors: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin || false, // in case you add isAdmin to User model
      },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const { password: _, ...userData } = user._doc;

    res.status(201).json({ message: "Login successful", user: userData, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ errors: "Error in login", details: error.message });
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
