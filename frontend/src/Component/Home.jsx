import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Timer,
  TrendingUp,
  CheckCircle,
  Home as HomeIcon,
  Bell,
  LogOut,
  Filter,
  Search,
} from "lucide-react";

// Enhanced Navbar Component
const Navbar = ({ userName }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/auction-logo.png"
            alt="Auction House Logo"
            className="h-12 w-12 rounded-full ring-4 ring-blue-500/50 hover:scale-110 transition"
          />
          <h1 className="text-white text-2xl font-extrabold tracking-tight">
            Auction <span className="text-blue-500">Hub</span>
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search auctions..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
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
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                {userName}
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
              >
                <LogOut />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("upcoming");
  const [timeRemaining, setTimeRemaining] = useState({});
  const navigate = useNavigate();

  const fetchAuctions = () => {
    setLoading(true);
    setError("");
    axios
      .get("http://localhost:3001/api/auction/auctions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.auctions)) {
          setAuctions(response.data.auctions);
          const initialTime = {};
          response.data.auctions.forEach((auction) => {
            const endTime = new Date(auction.auctionEnd).getTime();
            initialTime[auction.id] = endTime - new Date();
          });
          setTimeRemaining(initialTime);
        } else {
          setAuctions([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch auctions. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const updatedTime = {};
        auctions.forEach((auction) => {
          const endTime = new Date(auction.auctionEnd).getTime();
          const remaining = endTime - new Date().getTime();
          updatedTime[auction.id] = remaining > 0 ? remaining : 0;
        });
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [auctions]);

  const getTimeRemaining = (ms) => {
    if (ms <= 0) return "Auction Ended";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const renderAuctions = (auctions) => {
    return auctions.length > 0 ? (
      auctions.map((auction) => (
        <div
          key={auction.id}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-500/50"
        >
          <div className="relative">
            {auction.Product?.imageUrl ? (
              <div className="relative group">
                <img
                  src={auction.Product.imageUrl}
                  alt={auction.Product?.name || "Product Image"}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full flex items-center">
                  <Timer className="mr-2 w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold">
                    {getTimeRemaining(timeRemaining[auction.id])}
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-72 bg-gray-800 flex items-center justify-center">
                <p className="text-gray-500">No Image Available</p>
              </div>
            )}
          </div>

          <div className="p-6 space-y-4 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold truncate pr-4">
                {auction.Product?.name || "No Name Available"}
              </h2>
              <span className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full">
                ₹{auction.Product?.startingPrice || "N/A"}
              </span>
            </div>

            <p className="text-gray-300 text-sm line-clamp-2">
              {auction.description || "No description available"}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div className="flex items-center">
                <TrendingUp className="mr-2 w-4 h-4 text-green-400" />
                <span>
                  Starts: {new Date(auction.auctionStart).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 w-4 h-4 text-red-400" />
                <span>
                  Ends: {new Date(auction.auctionEnd).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <button
                onClick={() => navigate(`/details/${auction.id}`)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg 
                hover:from-blue-700 hover:to-blue-900 
                transition duration-300 
                transform hover:scale-105 
                flex items-center justify-center 
                space-x-2 
                group"
              >
                <span>View Auction Details</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full text-center text-white py-10">
        <p className="text-xl">No auctions available in this category</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
          <p className="text-white text-lg">Loading Auctions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-10 rounded-2xl text-center shadow-2xl border border-red-500/30">
          <p className="text-red-400 text-xl mb-6">{error}</p>
          <button
            onClick={fetchAuctions}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center space-x-2 mx-auto"
          >
            <Filter className="mr-2" />
            Retry Fetching Auctions
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar userName="John Doe" />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-10">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-6 mb-12">
            {["upcoming", "ongoing", "completed"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 flex items-center space-x-2
                  ${
                    activeCategory === category
                      ? "bg-blue-600 shadow-xl scale-105"
                      : "bg-gray-800 hover:bg-gray-700 hover:scale-105"
                  }
                `}
              >
                <span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                  Auctions
                </span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {category === "upcoming"
                    ? auctions.filter(
                        (a) => new Date(a.auctionStart) > new Date()
                      ).length
                    : category === "ongoing"
                    ? auctions.filter(
                        (a) =>
                          new Date(a.auctionStart) <= new Date() &&
                          new Date(a.auctionEnd) > new Date()
                      ).length
                    : auctions.filter(
                        (a) => new Date(a.auctionEnd) <= new Date()
                      ).length}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {activeCategory === "upcoming" &&
              renderAuctions(
                auctions.filter((a) => new Date(a.auctionStart) > new Date())
              )}
            {activeCategory === "ongoing" &&
              renderAuctions(
                auctions.filter(
                  (a) =>
                    new Date(a.auctionStart) <= new Date() &&
                    new Date(a.auctionEnd) > new Date()
                )
              )}
            {activeCategory === "completed" &&
              renderAuctions(
                auctions.filter((a) => new Date(a.auctionEnd) <= new Date())
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
