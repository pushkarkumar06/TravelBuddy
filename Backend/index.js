// index.js
import express from "express";
import users from "./routes/user_route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:8080", // 👈 frontend origin (Vite default)
    credentials: true, // 👈 allow cookies to be sent
  })
);

// ✅ Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // exit app on failure
  }
};

await connectToMongoDB(); // ✅ Use await in top-level module (ESM)

// Mount user routes
app.use("/api/v1/users", users);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

