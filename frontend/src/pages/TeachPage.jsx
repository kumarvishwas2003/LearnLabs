import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const TeachPage = () => {
  const { user } = useAuth();
  const [isInstructor, setIsInstructor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Check if user is instructor or admin
      setIsInstructor(["instructor", "admin"].includes(user.role));
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  const handleBecomeInstructor = async () => {
    try {
      const { data } = await axios.patch(
        "/api/users/become-instructor",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update auth context with the new user data
      login(localStorage.getItem("token"), data.user);

      // Redirect to create course page
      navigate("/create-course");
    } catch (error) {
      alert(
        "Upgrade failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Teach on LearnLabs</h1>

        {user ? (
          isInstructor ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-lg">
                Create an engaging course and share your knowledge.
              </p>
              <Link
                to="/create-course"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create New Course
              </Link>
            </div>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-lg">
                You need to be an instructor to create courses.
              </p>
              <button
                onClick={async () => {
                  try {
                    await axios.patch(
                      "http://localhost:5000/api/users/upgrade-to-instructor", // Note port 5000 for backend
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    );
                    setIsInstructor(true);
                    alert("You are now an instructor!");
                  } catch (error) {
                    alert(
                      "Upgrade failed: " +
                        (error.response?.data?.message || error.message)
                    );
                  }
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Become Instructor Now
              </button>
            </div>
          )
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="text-lg">Sign in to start teaching</p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachPage;
