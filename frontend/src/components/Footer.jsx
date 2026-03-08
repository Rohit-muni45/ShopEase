import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ShopEase</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted online shopping destination.
            Discover best deals, quality products, and fast delivery.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-white">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link  className="hover:text-white">Wishlist</Link></li>
            <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link className="hover:text-white">FAQ</Link></li>
            <li><Link  className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a className="hover:text-white"><FaFacebookF/></a>
            <a className="hover:text-white"><FaTwitter/></a>
            <a className="hover:text-white"><FaInstagram/></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ShopEase — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
