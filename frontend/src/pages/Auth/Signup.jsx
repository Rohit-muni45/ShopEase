import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/Toaster";
import { AuthContext } from "../../context/AuthContext";
import { emailRegex } from "../../utils/emailRegex";
import usePasswordStrength from "../../utils/usePasswordStrength";
import Signupimg from "../../assets/Signup.png";

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});
  const { checks, strength, isValid } = usePasswordStrength(password);

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid Email Address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!isValid) {
      errors.password = "Password does not meet the required criteria";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleClick = () => {
    showInfoToast("This feature is not available yet");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));

    // confirm password validation dynamcically
    if (name === "confirmPassword") {
      if (value !== password) {
        setError((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    }
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
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>

            <input
              autoComplete="off"
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

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>

            <input
              autoComplete="off"
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

          {/* Password */}
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
                className="w-full mt-1 border rounded-md px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password Strength */}
            {password && (
              <div className="mt-3 space-y-1 text-sm">
                <p
                  className={`font-medium ${strength === "Weak"
                    ? "text-red-500"
                    : strength === "Medium"
                      ? "text-yellow-500"
                      : "text-green-600"
                    }`}
                >
                  Password Strength: {strength}
                </p>

                <ul className="space-y-1 text-gray-600">
                  <li
                    className={
                      checks.length ? "text-green-600" : "text-red-500"
                    }
                  >
                    Minimum 8 characters
                  </li>

                  <li
                    className={
                      checks.uppercase ? "text-green-600" : "text-red-500"
                    }
                  >
                    One uppercase letter
                  </li>

                  <li
                    className={
                      checks.lowercase ? "text-green-600" : "text-red-500"
                    }
                  >
                    One lowercase letter
                  </li>

                  <li
                    className={
                      checks.number ? "text-green-600" : "text-red-500"
                    }
                  >
                    One number
                  </li>

                  <li
                    className={
                      checks.special ? "text-green-600" : "text-red-500"
                    }
                  >
                    One special character
                  </li>
                </ul>
              </div>
            )}

            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full mt-1 border rounded-md px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {error.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
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
            //src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg"
            src={Signupimg}
            alt="E-commerce Illustration"
            className="mx-auto mb-6 rounded-2xl shadow-lg"
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
