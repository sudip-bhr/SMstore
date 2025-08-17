import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.svg";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 text-lg transition duration-300 ${
      isActive ? "text-blue-500" : "text-gray-800"
    } group`;

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 flex justify-between items-center h-20 sm:h-16">
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-800 text-3xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link to="/" className="flex items-center">
              <motion.img
                src={logo}
                alt="SM Electronics Logo"
                className="h-14 sm:h-10 object-contain cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={linkClasses}>
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </NavLink>
            <NavLink to="/products" className={linkClasses}>
              Products
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </NavLink>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 sm:w-6 sm:h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25h10.5l1.5-7.5H6.75m0 0L5.106 5.272M6.75 14.25l-.75 3.75h12"
                />
              </motion.svg>
              {cart.length > 0 && (
                <motion.span
                  key={cart.length}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5"
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.div>

            {/* Auth Buttons */}
            {currentUser ? (
              <>
                <span className="text-gray-800 hidden sm:inline">
                  {currentUser.username}
                </span>
                <Button
                  onClick={handleLogout}
                 size="lg"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform transition-transform hover:scale-105"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                to="/sign-up"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform transition-transform hover:scale-105"
                  >
                  <FaUser className="mr-1" /> Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4 text-lg">
              <NavLink
                to="/"
                onClick={toggleMenu}
                className="text-gray-800 hover:text-blue-500 transition"
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                onClick={toggleMenu}
                className="text-gray-800 hover:text-blue-500 transition"
              >
                Products
              </NavLink>
            </div>
          </motion.nav>
        )}
      </header>

      {/* Spacer to prevent overlap */}
      <div className="h-20 sm:h-16"></div>
    </>
  );
};

export default Header;






