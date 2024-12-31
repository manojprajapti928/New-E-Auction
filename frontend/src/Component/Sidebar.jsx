import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaGavel,
  FaProductHunt,
  FaPlus,
  FaCog,
  FaSignOutAlt,
  FaList,
  FaRegListAlt,
  FaThList,
  FaListUl,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const sidebarLinks = [
    { name: "User List", icon: <FaUser />, path: "/UserList" },
    { name: "Add Product", icon: <FaPlus />, path: "/AddProduct" },
    { name: "Product Card", icon: <FaProductHunt />, path: "/ProductCard" },
    { name: "Add Auction", icon: <FaGavel />, path: "/AddAuction" },
    { name: "Auction List", icon: <FaRegListAlt />, path: "/AuctionList" },
    { name: "Product List", icon: <FaList />, path: "/ProductList" },
    { name: "Sold Product List", icon: <FaThList />, path: "" },
  ];

  return (
    <motion.div
      initial={{ width: "250px" }}
      animate={{ width: isOpen ? "250px" : "60px" }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-blue-600 text-white shadow-md fixed top-0 left-0 z-40 flex flex-col"
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 bg-white text-blue-700 hover:scale-110 p-2 rounded-full shadow-md flex items-center justify-center"
      >
        {isOpen ? "<" : ">"}
      </button>

      {/* Logo/Title */}
      <div className="text-center py-6">
        {isOpen && (
          <h1 className="text-xl font-bold text-transparent flex justify-start bg-clip-text bg-white pl-3 ml-11">
            Admin Hub
          </h1>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="mt-3 flex flex-col space-y-1 relative">
        {sidebarLinks.map((link) => (
          <div
            key={link.path}
            className="relative"
            onMouseEnter={() => setHoveredLink(link.name)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <Link
              to={link.path}
              className="flex items-center p-4 text-sm transition-all hover:bg-blue-700"
            >
              <span className="text-lg">{link.icon}</span>
              {isOpen && <span className="ml-3">{link.name}</span>}
            </Link>
            {!isOpen && hoveredLink === link.name && (
              <div className="absolute left-full top-1/3 transform -translate-y-1/3 bg-blue-600 text-white text-base p-2 rounded shadow-md">
                {link.name}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-gray-700">
        <Link
          to="/settings"
          className="flex items-center p-4 hover:bg-blue-700 transition-all"
        >
          <FaCog className="text-lg" />
          {isOpen && <span className="ml-4">Settings</span>}
        </Link>
        <div className="flex items-center p-4 transition-all cursor-pointer">
          <FaSignOutAlt className="text-lg text-red-600" />
          {isOpen && (
            <button
              className="p-2 ml-4 bg-red-700 text-white hover:bg-red-600 active:bg-red-800 rounded-md transition-all"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
