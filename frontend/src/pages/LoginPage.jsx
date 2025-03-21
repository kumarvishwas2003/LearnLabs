import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import side from "../images/side.webp";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side (Image Section) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-purple-100">
        <img src={side} alt="Login" className="w-3/4" />
      </div>

      {/* Right Side (Form Section) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-sm w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome Back!
          </h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-lg focus:outline-purple-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border rounded-lg focus:outline-purple-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg font-semibold"
            >
              Log in
            </button>
          </form>

          {/* Forgot Password & Sign Up Links */}
          <div className="flex justify-between mt-3 text-sm text-gray-500">
            <a href="/forgot-password" className="hover:text-purple-600">
              Forgot Password?
            </a>
            <Link to="/signup" className="text-purple-600 font-bold">
              Sign Up
            </Link>
          </div>

          {/* Divider */}
          

          {/* Social Logins */}
         
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
