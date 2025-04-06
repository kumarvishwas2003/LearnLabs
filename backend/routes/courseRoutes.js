const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCourse,
  getAllCourses,
  getMyCourses,
  getCourse,
  addSection,
  deleteSection,
  addLecture,
  deleteLecture,
  publishCourse,
  unpublishCourse,
} = require("../controllers/courseController");

// Course CRUD Routes
router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("instructor", "admin"),
  createCourse
);

router.get("/", getAllCourses);

router.get("/my-courses", authMiddleware.protect, getMyCourses);

router.get("/:id", getCourse);

// Section Management Routes
router.post(
  "/:id/sections",
  authMiddleware.protect,
  authMiddleware.restrictTo("instructor", "admin"),
  addSection
);

router.delete(
  "/:courseId/sections/:sectionId",
  authMiddleware.protect,
  authMiddleware.restrictTo("instructor", "admin"),
  deleteSection
);

// Lecture Management Routes
router.post(
  "/:courseId/sections/:sectionId/lectures",
  authMiddleware.protect,
  authMiddleware.restrictTo("instructor", "admin"),
  addLecture
);

router.delete(
  "/:courseId/lectures/:lectureId",
  authMiddleware.protect,
  authMiddleware.restrictTo("instructor", "admin"),
  deleteLecture
);

// Course Status Management
router.patch(
  "/:id/publish",
  authMiddleware.protect,
  authMiddleware.restrictTo("instructor", "admin"),
  publishCourse
);

router.patch(
  "/:id/unpublish",
  authMiddleware.protect,
  authMiddleware.restrictTo("instructor", "admin"),
  unpublishCourse
);

module.exports = router;
