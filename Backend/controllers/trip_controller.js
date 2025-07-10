import Activity from "../models/trip_model.js";
import User from "../models/user_model.js";

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
    const userId = req.user._id;

    // Step 1: Create activity with the host as the current user
    const activity = await Activity.create({
      ...req.body,
      host: userId,
      participants: [userId], // Add creator as first participant
      currentParticipants: 1,
    });

    // Step 2: Add this activity to user's joinedActivities
    await User.findByIdAndUpdate(userId, {
      $addToSet: { joinedActivities: activity._id },
    });

    // Step 3: Send final response
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
    const currentUserId = req.user?.id || req.user?._id;

    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthorized. User ID missing." });
    }

    const activities = await Activity.find({ host: { $ne: currentUserId } })
      .populate("host", "firstName lastName profilePicture rating")
      .populate("participants", "_id firstName lastName");

    res.status(200).json({ data: activities });
  } catch (err) {
    console.error("Get All Activities Error:", err);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};


export const joinActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const userId = req.user._id; // Or from req.body or context

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (activity.participants.includes(userId)) {
      return res.status(400).json({ message: "Already joined" });
    }

    if (activity.currentParticipants >= activity.maxParticipants) {
      return res.status(400).json({ message: "Activity is full" });
    }

    activity.participants.push(userId);
    activity.currentParticipants += 1;
    await activity.save();

    // Also add to user's joinedActivities
    await User.findByIdAndUpdate(userId, {
      $addToSet: { joinedActivities: activityId },
    });

    res.status(200).json({ message: "Successfully joined activity" });
  } catch (err) {
    console.error("Join activity error:", err);
    res.status(500).json({ message: "Server error joining activity" });
  }
};
