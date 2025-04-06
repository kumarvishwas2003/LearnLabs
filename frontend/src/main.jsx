// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext"; // Add this
// import App from "./App";
// import "./index.css";
// import TeachPage from "./pages/TeachPage";
// import CareerPage from "./pages/CareerPage";
// import YouTubePage from "./pages/YoutubePage";
// import ErrorBoundary from "./components/ErrorBoundary";
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard"; // Add this
// import ProtectedRoute from "./components/ProtectedRoute"; // Create this component

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Router>
//       <AuthProvider>
//         {" "}
//         {/* Wrap everything with AuthProvider */}
//         <Routes>
//           <Route path="/" element={<App />} />
//           <Route
//             path="/teach"
//             element={
//               <ProtectedRoute>
//                 <TeachPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/career"
//             element={
//               <ProtectedRoute>
//                 <CareerPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/youtube"
//             element={
//               <ErrorBoundary>
//                 <ProtectedRoute>
//                   <YouTubePage />
//                 </ProtectedRoute>
//               </ErrorBoundary>
//             }
//           />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route
//             path="/dashboard"
//             element={
//               // Add dashboard route
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Add this
import App from "./App";
import "./index.css";
import TeachPage from "./pages/TeachPage";
import CareerPage from "./pages/CareerPage";
import YouTubePage from "./pages/YoutubePage";
import ErrorBoundary from "./components/ErrorBoundary";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard"; // Add this
import ProtectedRoute from "./components/ProtectedRoute"; // Create this component
import CreateCoursePage from "./pages/CreateCoursePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import BecomeInstructorPage from "./pages/BecomeInstructorPage";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          {" "}
          {/* Wrap everything with AuthProvider */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/teach"
              element={
                <ProtectedRoute>
                  <TeachPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/career"
              element={
                <ProtectedRoute>
                  <CareerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/youtube"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <YouTubePage />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                // Add dashboard route
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-course"
              element={
                <ProtectedRoute roles={["instructor", "admin"]}>
                  <CreateCoursePage />
                </ProtectedRoute>
              }
            />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route
              path="/become-instructor"
              element={<BecomeInstructorPage />}
            />
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);