import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import auction from "../Images/auction.png";
import { Home as HomeIcon, Bell, LogOut, Search, User } from "lucide-react";
import axios from "axios";

export default function Navbar({ userName, onCategoryChange }) {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const submitLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // const fetchUserDetails = async() => {
  //    try{
  //     axios.get(``)
  //    }
  // }

  return (
    <nav className="top-0 left-0 shadow-x w-auto">
      <div className="py-3 px-3 flex justify-between items-center bg-blue-700">
        <div className="flex items-center  space-x-4">
          <img
            src={auction}
            alt="Auction House Logo"
            className="h-12 w-12 rounded-full ring-4 ring-blue-500/50 hover:scale-110 transition bg-white"
          />
          <h1 className="text-white text-2xl font-extrabold tracking-tight">
            Auction <span className="text-gray-800">Hub</span>
          </h1>
        </div>

        <ul className="flex space-x-4 justify-center">
          <li>
            <button
              onClick={() => onCategoryChange("ongoing")}
              className="px-4 py-2 bg-white rounded-xl hover:bg-blue-400 hover:text-white transition"
            >
              Ongoing Auctions
            </button>
          </li>
          <li>
            <button
              onClick={() => onCategoryChange("upcoming")}
              className="px-4 py-2 bg-white rounded-lg hover:bg-blue-400  hover:text-white transition"
            >
              Upcoming Auctions
            </button>
          </li>
          <li>
            <button
              onClick={() => onCategoryChange("completed")}
              className="px-4 py-2 bg-white rounded-lg hover:bg-blue-400 hover:text-white transition"
            >
              Completed Auctions
            </button>
          </li>
        </ul>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search auctions..."
              className="pl-10 pr-4 py-2 rounded-full bg-white text-gray-950 border border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/")}
              className="text-white hover:text-blue-400 transition"
            >
              <HomeIcon />
            </button>

            <button className="text-white hover:text-blue-400 transition relative">
              <Bell />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="bg-white text-black px-2 py-2 rounded-full text-sm font-medium shadow-md hover:bg-blue-400">
                <User />
              </div>
              <button
                onClick={submitLogout}
                className="bg-red-700 text-white hover:bg-white hover:text-red-700 p-2 rounded-full transition"
              >
                <LogOut />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
