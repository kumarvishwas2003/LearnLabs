const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a course title"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Development",
      "Business",
      "IT & Software",
      "Design",
      "Marketing",
      "Personal Development",
    ],
  },
  thumbnail: {
    type: String,
    required: [true, "Please add a thumbnail URL"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  sections: [
    {
      title: String,
      lectures: [
        {
          title: String,
          videoUrl: String,
          description: String,
          duration: Number,
          resources: [String],
        },
      ],
    },
  ],
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  publishedAt: Date,
});

module.exports = mongoose.model("Course", courseSchema);
