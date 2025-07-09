import Activity from "../models/trip_model.js";

export const getUpcomingTrips = async (req, res) => {
  try {
    const userId = req.user.id;

    const trips = await Trip.find({
      user: userId,
      date: { $gte: new Date() },
    }).sort("date");

    res.json(trips);
  } catch (err) {
    console.error("Error fetching upcoming trips:", err.message);
    res.status(500).json({ message: "Failed to fetch trips." });
  }
};



export const createTrip = async (req, res) => {
  try {
    const activity = await Activity.create({
      ...req.body,
      host: req.user._id, // from auth middleware
    });

    res.status(201).json({ message: "Activity created", activity });
  } catch (error) {
    console.error("Create activity error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ host: req.user._id }).sort({ date: 1 });

    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    console.error("Get my activities error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Controller: getAllActivities
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate("host", "firstName lastName profilePicture rating");
    res.status(200).json({ data: activities });
  } catch (err) {
    console.error("Get All Activities Error:", err);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};

export const joinActivity = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Set by JWT auth middleware
    const activityId = req.params.id;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // ✅ Check if already joined
    if (activity.participants.includes(userId)) {
      return res.status(400).json({ message: "You already joined this activity" });
    }

    // ✅ Check if full
    if (activity.currentParticipants >= activity.maxParticipants) {
      return res.status(400).json({ message: "Activity is full" });
    }

    // ✅ Add user to participants
    activity.participants.push(userId);
    activity.currentParticipants += 1;

    await activity.save();

    res.status(200).json({
      message: "Successfully joined the activity",
      data: activity,
    });
  } catch (error) {
    console.error("Join activity error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

