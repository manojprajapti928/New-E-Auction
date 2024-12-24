import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px]" : "ml-[80px]"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 bg-blue-500 text-white p-3 rounded-full shadow-md z-50"
        >
          {isSidebarOpen ? "<" : ">"}
        </button>

        {/* Top Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            className="p-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-all"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Log Out
          </button>
        </nav>

        {/* Dashboard Content */}
        <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="mt-4 text-gray-600">
            Welcome to the Admin Dashboard. Here, you can manage your platform
            effectively!
          </p>
        </div>
      </div>
    </div>
  );
}
