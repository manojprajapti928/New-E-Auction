import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; 
  };

  return (
    <div className="bg-gray-100 shadow-md p-3">
      <div className="flex items-center justify-between mx-5">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600 text-shadow shadow-black ">
          Auction
        </h1>

        {/* Search Box */}
        <div className="hidden md:flex items-center space-x-2">
          <label htmlFor="search" className="text-gray-600 font-medium">
            <FaSearch />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search here..."
            className="font-bold border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-11 text-lg font-bold text-gray-900">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <div className="relative group">
            <button className="hover:text-blue-600">Browse</button>
            <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-md rounded-md mt-2 z-10">
              <select
                className="p-2 bg-white w-full cursor-pointer"
                name="browse"
              >
                <option value="option1">Art</option>
                <option value="option2">Electronics</option>
                <option value="option3">Furniture</option>
                <option value="option4">Others</option>
              </select>
            </div>
          </div>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/service" className="hover:text-blue-600">
            Service
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </nav>

        {/* Sell Button */}
        <button
          className="hidden md:block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          aria-label="Sell"
          onClick={() => navigate("/LoginForm")}
        >
          Sell
        </button>

        <button
          className="p-2 bg-red-700 text-white rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          Log Out
        </button>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden bg-gray-50 border-t border-gray-200 p-3 space-y-2">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <div className="relative">
            <button className="hover:text-blue-600">Browse</button>
            <select
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              name="browse"
            >
              <option value="option1">Art</option>
              <option value="option2">Electronics</option>
              <option value="option3">Furniture</option>
              <option value="option4">Others</option>
            </select>
          </div>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/service" className="hover:text-blue-600">
            Service
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
          <button
            className="bg-blue-700 text-black rounded px-27 w-[27vw] hover:bg-blue-500 transition duration-300"
            aria-label="Sell"
            onClick={() => navigate("/LoginForm")}
          >
            Sell
          </button>
        </div>
      )}
    </div>
  );
}
