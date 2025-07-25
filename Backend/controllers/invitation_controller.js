import Invitation from "../models/invitation_model.js";
import Activity from "../models/trip_model.js";
import User from "../models/user_model.js"; // ✅ Import User model

export const sendInvitation = async (req, res) => {
  try {
    const { activityId, inviteeId } = req.body;

    console.log("Invite body:", req.body);
    console.log("Inviter ID (req.user._id):", req.user._id);

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    console.log("Activity Host ID:", activity.host?.toString());

    // ✅ Safe comparison of ObjectIds
    if (activity.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to invite" });
    }

    const existing = await Invitation.findOne({ activity: activityId, invitee: inviteeId });
    if (existing) {
      return res.status(400).json({ message: "Already invited" });
    }

    const invitation = await Invitation.create({
      activity: activityId,
      inviter: req.user._id,
      invitee: inviteeId,
    });

    res.status(201).json({ message: "Invitation sent", invitation });
  } catch (err) {
    console.error("Send Invite Error:", err);
    res.status(500).json({ message: "Failed to send invitation" });
  }
};

export const getMyInvitations = async (req, res) => {
  try {
    const invites = await Invitation.find({
      invitee: req.user._id,
      status: "pending",
    })
      .populate("inviter", "firstName lastName")
      .populate("activity", "title location");

    res.status(200).json({ data: invites });
  } catch (err) {
    console.error("Get Invitations Error:", err);
    res.status(500).json({ message: "Error fetching invitations" });
  }
};

export const respondToInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body; // "accepted" or "rejected"

    if (!["accepted", "rejected"].includes(response)) {
      return res.status(400).json({ message: "Invalid response value." });
    }

    const invitation = await Invitation.findById(id);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found." });
    }

    if (invitation.invitee.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to respond to this invitation." });
    }

    invitation.status = response;
    await invitation.save();

    if (response === "accepted") {
      const activity = await Activity.findById(invitation.activity);
      if (activity && !activity.participants.includes(req.user._id)) {
        activity.participants.push(req.user._id);
        await activity.save();
      }
    }

    // ✅ Send a notification to the inviter
    const inviter = await User.findById(invitation.inviter);

    console.log(
      `Notification to inviter (${inviter.firstName}): ${req.user.firstName} has ${response} your invitation.`
    );

    res.json({ message: `Invitation ${response}.` });
  } catch (err) {
    console.error("Error responding to invitation:", err);
    res.status(500).json({ message: "Failed to respond to invitation." });
  }
};
