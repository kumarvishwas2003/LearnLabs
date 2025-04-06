const mongoose = require("mongoose");

const instructorApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  message: {
    type: String,
    required: [true, "Please add a message"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: {
    type: Date,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Prevent duplicate applications
instructorApplicationSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model(
  "InstructorApplication",
  instructorApplicationSchema
);
