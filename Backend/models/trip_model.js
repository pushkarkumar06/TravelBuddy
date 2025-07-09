import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  maxParticipants: {
    type: Number,
    required: true,
  },
  currentParticipants: {
    type: Number,
    default: 0, // system-managed field
  },
  location: String,
  date: String,
  time: String,
  price: Number,
  tags: [String],
});


export default mongoose.model("Activity", activitySchema);
