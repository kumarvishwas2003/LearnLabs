import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PublishButton from "../components/PublishButton";

const CourseEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data.data);
        setSections(response.data.data.sections || []);
      } catch (error) {
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, navigate]);

  const addSection = async () => {
    if (!newSection.trim()) return;

    try {
      const response = await axios.post(
        `/api/courses/${id}/sections`,
        { title: newSection },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSections([...sections, response.data.data]);
      setNewSection("");
    } catch (error) {
      alert(
        "Failed to add section: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handlePublishSuccess = () => {
    setCourse({ ...course, status: "published" });
    alert("Course published successfully!");
  };

  if (loading) {
    return <div className="text-center p-8">Loading course details...</div>;
  }

  if (!course) {
    return <div className="text-center p-8">Course not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">Editing: {course.title}</h1>
        <PublishButton
          courseId={id}
          currentStatus={course.status}
          onPublishSuccess={handlePublishSuccess}
        />
      </div>

      {/* Course Status Badge */}
      <div className="mb-6">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            course.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {course.status === "published" ? "Published" : "Draft"}
        </span>
      </div>

      {/* Course Sections */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Curriculum</h2>

        {sections.length === 0 ? (
          <p className="text-gray-500 mb-4">
            No sections yet. Add your first section to get started.
          </p>
        ) : (
          <div className="space-y-4 mb-6">
            {sections.map((section) => (
              <div
                key={section._id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{section.title}</h3>
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => {
                      /* Implement delete section */
                    }}
                  >
                    Delete
                  </button>
                </div>
                {/* Lectures will go here */}
              </div>
            ))}
          </div>
        )}

        {/* Add New Section */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add a new section"
            className="flex-1 p-2 border rounded-l-lg focus:outline-purple-500"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addSection()}
          />
          <button
            onClick={addSection}
            disabled={!newSection.trim()}
            className={`px-4 py-2 rounded-r-lg ${
              !newSection.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Add Section
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate(`/courses/${id}/settings`)}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          Edit Course Details
        </button>
        <button
          onClick={() => navigate(`/courses/${id}/preview`)}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg"
        >
          Preview Course
        </button>
      </div>
    </div>
  );
};

export default CourseEditPage;
