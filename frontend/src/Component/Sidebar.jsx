import React from "react";
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
  FaThList
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  const sidebarLinks = [
    { name: "User List", icon: <FaUser />, path: "/UserList" },
    { name: "Add Product", icon: <FaPlus />, path: "/AddProduct" },
    { name: "Product Card", icon: <FaProductHunt />, path: "/ProductCard" },
    { name: "Add Auction", icon: <FaGavel />, path: "/AddAuction" },
    { name: "Auction List", icon: <FaRegListAlt/>, path: "/AuctionList" },
    { name: "Product List", icon: <FaList />, path: "/ProductList" },
    { name: "Sold Product List", icon: <FaThList />, path: "" }, // New Auction List link
  ];

  return (
    <motion.div
      initial={{ width: "250px" }}
      animate={{ width: "250px" }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-md fixed top-0 left-0 z-40 flex flex-col"
    >
      <div className="text-center py-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Admin Hub
        </h1>
      </div>

      <nav className="mt-6 flex flex-col space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-center p-4 text-sm transition-all hover:bg-gray-700"
          >
            <span className="text-lg">{link.icon}</span>
            <span className="ml-3">{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-gray-700">
        <Link
          to="/settings"
          className="flex items-center p-4 hover:bg-gray-700 transition-all"
        >
          <FaCog className="text-lg" />
          <span className="ml-3">Settings</span>
        </Link>
        <div className="flex items-center p-4 hover:bg-red-500/20 transition-all cursor-pointer">
          <FaSignOutAlt className="text-lg text-red-400" />
          <button
            className="p-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-all"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
