import { Link } from "react-router-dom";

const CourseCard = ({ course, isInstructor = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3">
          {course.description.substring(0, 60)}...
        </p>

        <div className="flex justify-between items-center">
          <span className="text-purple-600 font-bold">${course.price}</span>
          {isInstructor ? (
            <Link
              to={`/courses/${course._id}/edit`}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm"
            >
              Manage
            </Link>
          ) : (
            <Link
              to={`/courses/${course._id}`}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
            >
              Continue
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
