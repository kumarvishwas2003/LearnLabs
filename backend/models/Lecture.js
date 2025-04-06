const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  duration: Number,
  description: String,
  resources: [String],
});

module.exports = mongoose.model("Lecture", lectureSchema);
