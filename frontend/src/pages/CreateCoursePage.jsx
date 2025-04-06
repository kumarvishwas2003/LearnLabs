import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Add this import

const CreateCoursePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "Development",
    thumbnail: "",
  });
  const [uploading, setUploading] = useState(false); // Track thumbnail upload state
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.thumbnail) {
        throw new Error("Please upload a course thumbnail");
      }

      const response = await axios.post("/api/courses", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate(`/courses/${response.data.data._id}/edit`);
    } catch (error) {
      alert(
        "Course creation failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  
// const handleFileUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   // Client-side validation
//   if (!file.type.match("image.*")) {
//     alert("Only images are allowed (JPEG, PNG, GIF)");
//     return;
//   }

//   if (file.size > 5 * 1024 * 1024) {
//     alert("File size must be less than 5MB");
//     return;
//   }

//   try {
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("image", file);

//     console.log("Attempting upload..."); // Debug log

//     // const response = await axios.post(
//     //   "http://localhost:5000/api/upload", // Use full URL for testing
//     //   formData,
//     //   {
//     //     headers: {
//     //       "Content-Type": "multipart/form-data",
//     //       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     //     },
//     //     withCredentials: true,
//     //   }
//     // );
// const response = await axios.post(
//   "http://localhost:5000/api/upload",
//   formData,
//   {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     withCredentials: true, // Keep this
//   }
// );
//     console.log("Upload response:", response); // Debug log

//     setFormData((prev) => ({
//       ...prev,
//       thumbnail: response.data.url,
//     }));
//   } catch (error) {
//     console.error("Upload error details:", {
//       message: error.message,
//       response: error.response?.data,
//       config: error.config,
//     });
//     alert(`Upload failed: ${error.response?.data?.message || "Server error"}`);
//   } finally {
//     setUploading(false);
//   }
// };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setFormData((prev) => ({
        ...prev,
        thumbnail: response.data.url,
      }));
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert(
        "Upload failed: " + (error.response?.data?.message || "Server error")
      );
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-2">Course Title*</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2">Description*</label>
          <textarea
            className="w-full p-3 border rounded-lg h-32"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Price (USD)*</label>
            <input
              type="number"
              min="0"
              className="w-full p-3 border rounded-lg"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Category*</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="Development">Development</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-gray-700 mb-2">Course Thumbnail*</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            required
          />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {formData.thumbnail && !uploading && (
            <img
              src={formData.thumbnail}
              alt="Preview"
              className="mt-2 h-32 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:bg-purple-300"
          disabled={uploading}
        >
          {uploading ? "Creating Course..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default CreateCoursePage;
