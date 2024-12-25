import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("upcoming");
  const [timeRemaining, setTimeRemaining] = useState({});

  // Fetch auctions from the server
  const fetchAuctions = () => {
    setLoading(true);
    setError("");
    axios
      .get(`http://localhost:3001/api/auction/auctions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.auctions)) {
          setAuctions(response.data.auctions);

          // Initialize timeRemaining state
          const initialTime = {};
          response.data.auctions.forEach((auction) => {
            const endTime = new Date(auction.auctionEnd).getTime();
            initialTime[auction.id] = endTime - new Date().getTime();
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

  // Update remaining time every second
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

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

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
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
        >
          <div className="p-4">
            {auction.Product?.imageUrl && (
              <img
                src={auction.Product.imageUrl}
                alt={auction.Product?.name || "Product Image"}
                className="w-full h-64 object-cover mt-4 rounded-md"
              />
            )}
            <h2 className="text-lg font-bold text-gray-900">
              {auction.Product?.name || "No Name Available"}
            </h2>
            <p className="text-gray-600 mt-2">
              {auction.description || "No description available"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-bold">Starting Price:</span> ₹
              {auction.Product?.startingPrice || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Auction Start:</span>{" "}
              {new Date(auction.auctionStart).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Auction End:</span>{" "}
              {new Date(auction.auctionEnd).toLocaleString()}
            </p>

            {/* Display live countdown timer */}
            <p
              className={`mt-4 font-bold ${
                timeRemaining[auction.id] > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Time Left: {getTimeRemaining(timeRemaining[auction.id])}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-white">No auctions available.</p>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={fetchAuctions}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Sidebar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 py-10">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleCategoryChange("upcoming")}
            className={`${
              activeCategory === "upcoming" ? "bg-blue-500" : "bg-gray-800"
            } text-white px-6 py-2 rounded-md hover:bg-blue-600 transition`}
          >
            Upcoming Auctions
          </button>
          <button
            onClick={() => handleCategoryChange("ongoing")}
            className={`${
              activeCategory === "ongoing" ? "bg-blue-500" : "bg-gray-800"
            } text-white px-6 py-2 rounded-md hover:bg-blue-600 transition`}
          >
            Ongoing Auctions
          </button>
          <button
            onClick={() => handleCategoryChange("completed")}
            className={`${
              activeCategory === "completed" ? "bg-blue-500" : "bg-gray-800"
            } text-white px-6 py-2 rounded-md hover:bg-blue-600 transition`}
          >
            Completed Auctions
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default AuctionList;
