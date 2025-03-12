// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import TeachPage from "../src/pages/TeachPage"
import CareerPage from "../src/pages/CareerPage";
import YouTubePage from "../src/pages/YoutubePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/teach" element={<TeachPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/youtube" element={<YouTubePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
