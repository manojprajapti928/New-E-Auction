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
        className={`flex-1 flex flex-col transition-all duration-300 font-bold ${
          isSidebarOpen ? "ml-[250px]" : "ml-[60px]"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4  bg-white text-blue-700 hover:scale-110 p-3 rounded-full shadow-md flex items-start"
          style={{
            left: isSidebarOpen ? "270px" : "100px", // Adjust button position based on sidebar state
          }}
        >
          {isSidebarOpen ? "<" : ">"}
        </button>

        {/* Top Navigation Bar */}
        <nav className="bg-blue-600 text-white p-[17px] flex justify-between items-center shadow-md border-b border-black">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          {/* <button
            className="p-2 bg-red-600 text-white rounded-md"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Log Out
          </button> */}
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
