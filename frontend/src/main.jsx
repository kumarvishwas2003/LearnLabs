// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import TeachPage from "../src/pages/TeachPage"
import CareerPage from "../src/pages/CareerPage";
import YouTubePage from "../src/pages/YoutubePage";
import ErrorBoundary from "./components/ErrorBoundary";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      {/* <Routes>
        <Route path="/" element={<App />} />
        <Route path="/teach" element={<TeachPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route
          path="/youtube"
          element={
            <ErrorBoundary>
              <YouTubePage />
            </ErrorBoundary>
          }
        />
      </Routes> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/teach" element={<TeachPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route
          path="/youtube"
          element={
            <ErrorBoundary>
              <YouTubePage />
            </ErrorBoundary>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
