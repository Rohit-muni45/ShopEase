import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
    navigate("/signin");
    setOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          ShopEase
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link to="/" onClick={handleClose} className="hover:text-indigo-600">
            Home
          </Link>
          <Link to="/products" className="hover:text-indigo-600">
            Products
          </Link>
          <Link to="/about" className="hover:text-indigo-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-indigo-600">
            Contact
          </Link>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative hover:text-indigo-600 flex items-center"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {!user ? (
            <>
              <Link
                to="/signin"
                onClick={handleClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 transition cursor-pointer"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdown(!profileDropdown);
                  setOpen(false);
                }}
                className="border rounded-full w-8 h-8 overflow-hidden flex items-center justify-center cursor-pointer"
              >
                <img
                  src={user.image || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 text-gray-700">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <span className="text-2xl">&times;</span>
          ) : (
            <span className="text-2xl">&#9776;</span>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden fixed top-14 left-0 w-full bg-white px-6 py-6 space-y-4 border-t text-gray-600 font-medium shadow-lg z-40">
          <Link
            to="/"
            onClick={handleClose}
            className="block hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={handleClose}
            className="block hover:text-indigo-600"
          >
            Products
          </Link>
          <Link
            to="/about"
            onClick={handleClose}
            className="block hover:text-indigo-600"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={handleClose}
            className="block hover:text-indigo-600"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            onClick={handleClose}
            className="block hover:text-indigo-600"
          >
            Cart
          </Link>

          {!user ? (
            <>
              <Link
                to="/signin"
                onClick={handleClose}
                className="block px-4 py-2 border rounded-md hover:bg-gray-100 transition text-center"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setProfileDropdown(!profileDropdown);
                  setOpen(false);
                }}
                className="w-full px-4 py-2 border rounded-md text-left hover:bg-gray-100 transition"
              >
                {user.name}
              </button>
              <button
                onClick={logout}
                className="block w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-center"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
