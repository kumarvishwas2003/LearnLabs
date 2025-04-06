const Course = require("../models/Course");
const User = require("../models/User");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    // Add instructor to course data
    req.body.instructor = req.user.id;

    // Create course
    const course = await Course.create(req.body);

    // Add course to instructor's created courses
    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdCourses: course._id },
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get enrolled and created courses for logged-in user
exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "enrolledCourses",
        populate: { path: "instructor", select: "name" },
      })
      .populate("createdCourses");

    res.status(200).json({
      success: true,
      data: {
        enrolled: user.enrolledCourses,
        created: user.createdCourses,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get a single course by ID
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email")
      .populate("sections.lectures");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Publish a course
exports.publishCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { status: "published", publishedAt: Date.now() },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Unpublish a course
exports.unpublishCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { status: "draft", publishedAt: null },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Add a section to a course
exports.addSection = async (req, res) => {
  try {
    const { title } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    course.sections.push({ title });
    await course.save();

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a section from a course
exports.deleteSection = async (req, res) => {
  try {
    const { courseId, sectionId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    course.sections = course.sections.filter(
      (section) => section._id.toString() !== sectionId
    );
    await course.save();

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Add a lecture to a section
exports.addLecture = async (req, res) => {
  try {
    const { title, videoUrl } = req.body;
    const { courseId, sectionId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const section = course.sections.id(sectionId);
    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });
    }

    section.lectures.push({ title, videoUrl });
    await course.save();

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a lecture
exports.deleteLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    course.sections.forEach((section) => {
      section.lectures = section.lectures.filter(
        (lecture) => lecture._id.toString() !== lectureId
      );
    });

    await course.save();

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
