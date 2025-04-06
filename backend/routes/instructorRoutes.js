const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const InstructorApplication = require("../models/InstructorApplication");

router.post("/", authMiddleware.protect, async (req, res) => {
  try {
    const application = await InstructorApplication.create({
      user: req.user.id,
      message: req.body.message,
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
