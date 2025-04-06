import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BecomeInstructorPage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/instructor-applications", {
        userId: user.id,
        message,
      });
      setSubmitted(true);
    } catch (error) {
      alert("Application failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>
        <p>We'll review your application and get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Become an Instructor</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Why do you want to teach?
          </label>
          <textarea
            className="w-full p-3 border rounded-lg h-32"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BecomeInstructorPage;
