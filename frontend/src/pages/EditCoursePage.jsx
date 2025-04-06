import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data.data);
      } catch (error) {
        navigate("/dashboard");
      }
    };
    fetchCourse();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Editing: {course?.title}</h1>
      {/* Add your curriculum builder here */}
    </div>
  );
};

export default EditCoursePage;
