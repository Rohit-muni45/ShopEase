import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Banner() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="w-full min-h-[400px] bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center px-8 md:px-16 py-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-orange-400">ShopEase</span>
          </h1>

          <p className="text-lg font-semibold mb-2">
            Your One-Stop Destination for Smart Shopping
          </p>

          <p className="text-sm opacity-90 leading-relaxed">
            Discover trending products, unbeatable prices, and fast delivery.
            Shop your favorites with ease and comfort, only on ShopEase.
          </p>

          <button onClick={() => navigate('/products')}
           className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 cursor-pointer">
            Shop Now
          </button>
        </div>

        {/* Right Image (Circled Part) */}
        <div className="hidden md:flex w-1/2 justify-end">
          <img
            src="../../src/assets/Hero-Image.png"
            alt="ShopEase Banner Illustration"
            className="h-84 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
