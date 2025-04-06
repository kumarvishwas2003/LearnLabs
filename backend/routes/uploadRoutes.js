const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const authMiddleware = require("../middlewares/authMiddleware");

// Remove the debug middleware that was causing the error
router.post(
  "/",
  authMiddleware.protect, // Authentication check
  upload.single("image"), // File upload handler
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Success response
    res.json({
      success: true,
      url: `/uploads/${req.file.filename}`,
    });
  }
);

module.exports = router;
