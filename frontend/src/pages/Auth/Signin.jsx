import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/Toaster";
import { AuthContext } from "../../context/AuthContext";

const Signin = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    showInfoToast("This feature is not available yet");
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      console.log(res);
      showSuccessToast("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      showErrorToast(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12 bg-white">
        {/* Logo */}
        <div className="mb-4">
          <Link to="/">
            <h2 className="text-lg text-indigo-500 font-medium">ShopEase</h2>
          </Link>
        </div>
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-500 mb-6">
          Sign in to continue shopping and explore amazing deals.
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
            Sign in with Google
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
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="mail@example.com"
              className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            className={`w-full py-2 rounded-md transition 
                      ${
                        !email || !password
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                      }`}
          >
            {loading ? "Siging In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 ">
            Sign Up
          </Link>
        </p>

        <p className="text-xs text-gray-400 mt-4 text-center">
          ©2025 ShopEase. All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-full md:w-1/2 bg-linear-to-br from-indigo-700 to-purple-600 text-white justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/topography.png')]"></div>

        <div className="relative text-center px-10">
          <img
            src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8183.jpg"
            alt="E-commerce Illustration"
            className="mx-auto mb-6 rounded-2xl shadow-lg w-80"
          />
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to <span className="text-yellow-300">ShopEase</span>
          </h2>
          <p className="text-sm max-w-md mx-auto">
            Log in to manage your orders, track your deliveries, and access
            exclusive member offers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
