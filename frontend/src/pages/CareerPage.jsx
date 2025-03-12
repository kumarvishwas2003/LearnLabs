import { useState } from "react";
import {
  ArrowPathIcon,
  ChevronRightIcon,
  UserGroupIcon,
  ChartBarIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const CareerPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState(["React", "Python", "Cloud Computing"]);

  // Sample data
  const careerPaths = [
    { title: "Frontend Development", growth: "25% growth", courses: 58 },
    { title: "Data Science", growth: "32% growth", courses: 72 },
    { title: "Digital Marketing", growth: "18% growth", courses: 45 },
  ];

  const recommendedCourses = [
    {
      title: "Advanced React Development",
      rating: 4.8,
      students: 15000,
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhY3R8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Python for Data Analysis",
      rating: 4.7,
      students: 22000,
      image:
        "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHl0aG9ufGVufDB8fDB8fHww",
    },
    {
      title: "SEO Masterclass",
      rating: 4.6,
      students: 18000,
      image:
        "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const newMessages = [...messages, { role: "user", content: input }];
      setMessages(newMessages);
      setInput("");

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: [
              {
                role: "system",
                content:
                  "You are a professional career advisor specialized in tech careers. Provide concise, actionable advice.",
              },
              ...newMessages,
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.choices[0].message.content,
        },
      ]);
    } catch (err) {
      setError(err.message || "Failed to get response. Please try again.");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-udemy-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Career Guidance Center</h1>
          <p className="text-xl mb-8">
            AI-powered career advisor ready to help you succeed
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-2xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about career paths, skills, or job market trends..."
              className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-udemy-purple-300 text-gray-900"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-udemy-purple-500 text-white px-6 py-2.5 rounded-md hover:bg-udemy-purple-600 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Get Advice"}
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* AI Chat Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BookOpenIcon className="h-8 w-8 mr-2 text-udemy-purple-500" />
            AI Career Advisor
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-udemy-purple-100 ml-auto"
                    : "bg-gray-100"
                }`}
              >
                <p className="text-gray-800 whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            ))}

            {isLoading && (
              <div className="p-4 rounded-lg bg-gray-100 max-w-[80%]">
                <div className="flex items-center text-gray-600">
                  <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                  Analyzing your career query...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Career Paths Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ChartBarIcon className="h-8 w-8 mr-2 text-udemy-purple-500" />
            Suggested Career Paths
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {careerPaths.map((path, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg mb-2">{path.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{path.growth}</p>
                <div className="flex items-center text-sm text-udemy-purple-500">
                  <span>{path.courses} courses</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Recommendations */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <UserGroupIcon className="h-8 w-8 mr-2 text-udemy-purple-500" />
            Recommended Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-udemy-purple-100 text-udemy-purple-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Recommended Courses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCourses.map((course, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-40 bg-gray-200">
                  <img src={course.image} alt="" className="h-40 w-full object-cover"/>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{course.title}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-udemy-orange">★ {course.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
