import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import side from "../images/side.webp";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/auth/login",
  //       formData
  //     );

  //     if (response.data.success) {
  //       login(response.data.token, response.data.user);
  //       navigate("/dashboard");
  //     }
  //   } catch (err) {
  //     setError(
  //       err.response?.data?.message ||
  //         "Login failed. Please check your credentials and try again."
  //     );
  //   }
  // };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   try {
     const response = await axios.post("http://localhost:5000/api/auth/login", {
       email: formData.email,
       password: formData.password,
     });

     if (response.data.token && response.data.user) {
       login(response.data.token, response.data.user);
       navigate("/");
     } else {
       throw new Error("Invalid response from server");
     }
   } catch (error) {
     setError(error.response?.data?.message || "Login failed");
   } finally {
     setLoading(false);
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
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

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
                required
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
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg font-semibold transition-colors duration-300"
            >
              Log in
            </button>
          </form>

          {/* Forgot Password & Sign Up Links */}
          <div className="flex justify-between mt-4 text-sm">
            <Link
              to="/forgot-password"
              className="text-gray-500 hover:text-purple-600"
            >
              Forgot Password?
            </Link>
            <div className="text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Social Logins (Optional) */}
          {/*
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-50">
                <FaGoogle className="h-5 w-5 text-gray-600" />
              </button>
              <button className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-50">
                <FaFacebook className="h-5 w-5 text-gray-600" />
              </button>
              <button className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-50">
                <FaApple className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
