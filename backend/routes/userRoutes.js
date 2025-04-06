const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

// Upgrade to instructor
router.patch(
  "/upgrade-to-instructor",
  authMiddleware.protect,
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { role: "instructor" },
        { new: true }
      );

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.patch("/become-instructor", authMiddleware.protect, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { role: "instructor" },
    { new: true } // Return the updated document
  ).select("-password"); // Don't send back password

  res.json({
    success: true,
    user, // Send back the updated user object
  });
});

module.exports = router;
