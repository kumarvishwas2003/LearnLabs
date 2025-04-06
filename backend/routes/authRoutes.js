const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Added this line
const authMiddleware = require("../middlewares/authMiddleware");

// Authentication routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// User session route
router.get(
  "/me",
  authMiddleware.protect,
  authController.getMe // Make sure this exists in authController
);

module.exports = router;
