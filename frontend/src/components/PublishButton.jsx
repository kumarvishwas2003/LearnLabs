import axios from "axios";
import { useParams } from "react-router-dom";

const PublishButton = ({ courseStatus, onPublish }) => {
  const { id } = useParams();

  const handlePublish = async () => {
    try {
      await axios.patch(
        `/api/courses/${id}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onPublish();
      alert("Course published successfully!");
    } catch (error) {
      alert("Publish failed: " + error.response?.data?.message);
    }
  };

  return (
    <button
      onClick={handlePublish}
      disabled={courseStatus === "published"}
      className={`px-4 py-2 rounded ${
        courseStatus === "published"
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 text-white"
      }`}
    >
      {courseStatus === "published" ? "Published" : "Publish Course"}
    </button>
  );
};
