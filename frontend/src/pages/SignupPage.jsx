import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import side from "../images/side.webp";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const textResponse = await response.text();
    const data = textResponse ? JSON.parse(textResponse) : {};

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    navigate("/login");
  } catch (err) {
    setError(err.message);
  }
};
  return (
    <div className="min-h-screen flex">
      {/* Left Side (Image Section) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-purple-100">
        <img src={side} alt="Sign Up" className="w-3/4" />
      </div>

      {/* Right Side (Form Section) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-sm w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create Your Account
          </h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border rounded-lg focus:outline-purple-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

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
              Sign Up
            </button>
          </form>

          {/* Already Have an Account? */}
          <div className="text-sm text-gray-500 mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-bold">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
