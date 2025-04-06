import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { BookOpen, Clock, Heart, Bell, Settings, LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState({ enrolled: [], created: [] });
  const [loadingCourses, setLoadingCourses] = useState(true);

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses/my-courses");
      const data = response.data.data || {};
      setCourses({
        enrolled: data.enrolled || [],
        created: data.created || [],
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoadingCourses(false);
    }
  };

  if (user) fetchCourses();
}, [user]);


  const overallProgress =
    courses.enrolled.length > 0 ? courses.enrolled.reduce((acc, course) => acc + course.progress, 0) / courses.enrolled.length: 0;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-lg fixed h-full p-4">
        <div className="mb-8">
          <Link to="/" className="text-3xl font-bold mr-4">
            <span className="text-purple-700">L</span>earn
            <span className="text-purple-700">L</span>abs
          </Link>
          <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
        </div>

        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center p-2 text-gray-700 hover:bg-purple-50 rounded-lg"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            My Learning
          </Link>
          <Link
            to="/my-courses"
            className="flex items-center p-2 text-gray-700 hover:bg-purple-50 rounded-lg"
          >
            <Clock className="h-5 w-5 mr-2" />
            My Courses
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center p-2 text-gray-700 hover:bg-purple-50 rounded-lg"
          >
            <Heart className="h-5 w-5 mr-2" />
            Wishlist
          </Link>
          <Link
            to="/notifications"
            className="flex items-center p-2 text-gray-700 hover:bg-purple-50 rounded-lg"
          >
            <Bell className="h-5 w-5 mr-2" />
            Notifications
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-sm">
              3
            </span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center p-2 text-gray-700 hover:bg-purple-50 rounded-lg"
          >
            <Settings className="h-5 w-5 mr-2" />
            Account Settings
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center p-2 text-gray-700 hover:bg-purple-50 rounded-lg mt-4"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Log Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Learning</h1>
          {courses.enrolled.length > 0 && (
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm text-gray-600">
                {Math.round(overallProgress)}% Overall Progress
              </span>
            </div>
          )}
        </div>

        {/* Instructor Courses */}
        {user?.role === "instructor" && courses.created.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">Courses You're Teaching</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.created.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={
                      course.thumbnail || "https://via.placeholder.com/300x150"
                    }
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Created by you</p>
                    <Link
                      to={`/instructor/courses/${course._id}`}
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
                    >
                      Manage Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enrolled Courses */}
        {courses.enrolled.length > 0 ? (
          <>
            <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.enrolled.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={
                      course.thumbnail || "https://via.placeholder.com/300x150"
                    }
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress: {course.progress}%</span>
                      <span>{course.duration || "N/A"}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        Last accessed: {course.lastAccessed || "N/A"}
                      </span>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
                        Resume
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          !loadingCourses && (
            <div className="text-center py-12">
              <h2 className="text-xl text-gray-600 mb-4">
                No courses enrolled yet
              </h2>
              <Link
                to="/courses"
                className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
              >
                Browse Courses
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
