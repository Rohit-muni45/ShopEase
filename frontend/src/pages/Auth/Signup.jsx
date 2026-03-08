import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/Toaster";
import { AuthContext } from "../../context/AuthContext";
import { emailRegex } from "../../utils/emailRegex";

const Signup = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (emailRegex.test(email)) {
      errors.email = "Please enter a valid Email Address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } 

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClick = () => {
    console.log("clicked");
    showInfoToast("This feature is not available yet");
  };

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await register(name, email, password);
      showSuccessToast("User registered successfully");
      navigate("/signin");
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12 bg-white">
        {/* Logo */}
        <Link to="/">
          <div className="mb-6">
            <h2 className="text-lg text-indigo-500 font-medium">ShopEase</h2>
          </div>
        </Link>

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Get Started
        </h2>
        <p className="text-gray-500 mb-6">
          Create your account to start shopping the best deals online.
        </p>

        {/* Social Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleClick}
            className="w-full border rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="mail@example.com"
              className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="********"
                className="w-full mt-1 border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer hover:text-gray-700 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600">
              Sign In
            </Link>
          </p>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">
          By clicking continue, you agree to our{" "}
          <a href="#" className="text-blue-600">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600">
            Privacy Policy
          </a>
          .
        </p>

        <p className="text-xs text-gray-400 mt-2">
          ©2025 ShopEase. All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-full md:w-1/2 bg-linear-to-br from-indigo-700 to-purple-600 text-white justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/topography.png')]"></div>

        <div className="relative text-center px-10">
          <img
            src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg"
            alt="E-commerce Illustration"
            className="mx-auto mb-6 rounded-2xl shadow-lg w-80"
          />
          <h2 className="text-2xl font-semibold mb-4">
            Supercharge your shopping with{" "}
            <span className="text-yellow-300">ShopEase</span>
          </h2>
          <p className="text-sm max-w-md mx-auto">
            Discover exclusive deals, track your orders, and enjoy a smooth
            online shopping experience — all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
