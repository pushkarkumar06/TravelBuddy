// index.js
import express from "express";
import users from "./routes/user_route.js";
import tripRoutes from "./routes/trip_routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import invitationRoutes from "./routes/invitation_routes.js";
import notificationRoutes from "./routes/notification_routes.js";
import Trip from "./models/trip_model.js"; // ✅ Import your Trip model

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// ✅ Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 👇 Patch the trip host once
    const updated = await Trip.updateOne(
      { _id: new mongoose.Types.ObjectId("688099cffb29fb118fd80cf3") },
      { $set: { host: new mongoose.Types.ObjectId("6880997f029cc4ffe84be728") } }
    );

    if (updated.modifiedCount > 0) {
      console.log("✅ Trip host updated to current user");
    } else {
      console.log("ℹ️ Trip host already correct or not found");
    }
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

await connectToMongoDB();

// Routes
app.use("/api/v1/users", users);
app.use("/api/v1/trips", tripRoutes);
app.use("/api/v1/invitations", invitationRoutes);
app.use("/api/notifications", notificationRoutes);

// Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
