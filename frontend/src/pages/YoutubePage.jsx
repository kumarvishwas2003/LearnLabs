import { useEffect, useState, useCallback } from "react";
import { FiSearch, FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";

const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YT_API_KEY;

const YoutubePage = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState(["web development"]);
  const [loading, setLoading] = useState(false);
  const [videoCache, setVideoCache] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);

  // Available learning topics with icons
  const topics = [
    { id: "web-dev", name: "Web Development", icon: "💻" },
    { id: "js", name: "JavaScript", icon: "🟨" },
    { id: "react", name: "React.js", icon: "⚛️" },
    { id: "python", name: "Python", icon: "🐍" },
    { id: "ml", name: "Machine Learning", icon: "🧠" },
    { id: "cloud", name: "Cloud Computing", icon: "☁️" },
    { id: "mobile", name: "Mobile Development", icon: "📱" },
    { id: "data", name: "Data Science", icon: "📊" },
  ];

  // Fetch videos with combined search and topic filters (optimized)
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);

      // Cache key for current search + topics
      const cacheKey = `${searchQuery}-${selectedTopics.join(",")}`;

      // Check cache first
      if (videoCache[cacheKey]) {
        setCourses(videoCache[cacheKey]);
        setLoading(false);
        return;
      }

      const query = `${searchQuery} ${selectedTopics.join(" ")}`.trim();

      // Handle empty query case
      if (!query) {
        setCourses([]);
        setLoading(false);
        return;
      }

      // Get videos with statistics in one call
      const response = await fetch(
        `${API_URL}/search?` +
          new URLSearchParams({
            part: "snippet",
            maxResults: 12,
            q: query,
            type: "video",
            key: API_KEY,
            videoEmbeddable: true,
          })
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      // If we have videos, get their details in a single batch request
      if (data.items && data.items.length > 0) {
        // Extract all video IDs
        const videoIds = data.items.map((item) => item.id.videoId).join(",");

        // Single API call for all video details
        const detailsResponse = await fetch(
          `${API_URL}/videos?` +
            new URLSearchParams({
              part: "statistics,contentDetails,snippet",
              id: videoIds,
              key: API_KEY,
            })
        );

        const detailsData = await detailsResponse.json();

        // Map the detailed data to our videos format
        if (detailsData.items) {
          const enrichedVideos = data.items.map((item) => {
            const details = detailsData.items.find(
              (detail) => detail.id === item.id.videoId
            );

            return {
              ...item,
              details: details || null,
            };
          });

          // Update cache
          setVideoCache((prev) => ({
            ...prev,
            [cacheKey]: enrichedVideos,
          }));

          setCourses(enrichedVideos);
        }
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setCourses([]);
      // Use a more user-friendly error message
      if (error.message.includes("quota")) {
        alert(
          "We've reached our daily request limit. Please try again tomorrow or browse our existing content."
        );
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedTopics, videoCache]);

  // Debounced search implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 600); // Debounce time to reduce API calls

    return () => clearTimeout(timer);
  }, [fetchCourses]);

  // Format duration from ISO 8601 format
  const formatDuration = (duration) => {
    if (!duration) return "Unknown duration";

    // Convert ISO 8601 to hours and minutes
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  // Function to play a video
  const playVideo = (videoId) => {
    setActiveVideo(videoId);
  };

  // Function to close the video player
  const closeVideoPlayer = () => {
    setActiveVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold mr-4">
            <Link to="/">
              <span className="text-slate-500">L</span>earn
              <span className="text-slate-500">L</span>abs
            </Link>
            </div>
          </div>
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4 flex justify-between items-center">
              <h3 className="font-bold">
                {
                  courses.find((c) => c.id.videoId === activeVideo)?.snippet
                    .title
                }
              </h3>
              <button
                onClick={closeVideoPlayer}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Topics Filter */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Popular Topics</h3>
          <div className="flex overflow-x-auto pb-2 hide-scrollbar gap-3 flex-wrap">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() =>
                  setSelectedTopics((prev) =>
                    prev.includes(topic.name)
                      ? prev.filter((t) => t !== topic.name)
                      : [...prev, topic.name]
                  )
                }
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 min-w-[120px] justify-center ${
                  selectedTopics.includes(topic.name)
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-gray-800 hover:bg-gray-100 border"
                }`}
              >
                <span>{topic.icon}</span>
                <span>{topic.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Videos Display */}
        <h3 className="text-2xl font-bold mb-4">Videos for you</h3>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-lg">Loading videos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((video) => (
              <div
                key={video.id.videoId}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Thumbnail */}
                <div
                  className="relative aspect-video cursor-pointer"
                  onClick={() => playVideo(video.id.videoId)}
                >
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Watch Video
                    </button>
                  </div>
                </div>

                {/* Video info */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3
                    className="font-bold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
                    onClick={() => playVideo(video.id.videoId)}
                  >
                    {video.snippet.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-2">
                    {video.snippet.channelTitle}
                  </p>

                  {/* Additional info */}
                  <div className="flex items-center text-xs text-gray-600 mt-auto gap-4">
                    {video.details?.statistics && (
                      <span>
                        {parseInt(
                          video.details.statistics.viewCount
                        ).toLocaleString()}{" "}
                        views
                      </span>
                    )}
                    {video.details?.contentDetails && (
                      <span>
                        {formatDuration(video.details.contentDetails.duration)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && courses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FiBookOpen className="mx-auto text-5xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No videos found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking
              for
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">LearnLabs</h3>
              <p className="text-gray-300">
                Your gateway to quality educational content from around the web.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Popular Topics</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Web Development</li>
                <li>JavaScript</li>
                <li>React.js</li>
                <li>Python</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">About</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Settings</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2025 LearnLabs. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default YoutubePage;
