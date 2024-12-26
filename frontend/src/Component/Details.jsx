import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Timer,
  TrendingUp,
  CheckCircle,
  Award,
  Tag,
  ShieldCheck,
} from "lucide-react";

const Details = () => {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [highestBid, setHighestBid] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const navigate = useNavigate();
  // console.log(bidHistory, "bidHistory");

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/auction/auctions/${auctionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const auctionData = response.data.auction;
        setAuction(auctionData);

        const endTime = new Date(auctionData.auctionEnd).getTime();
        setTimeLeft(endTime - new Date().getTime());
        fetchBidHistory();
      } catch (error) {
        setError("Failed to fetch auction details. Please try again.");
        console.error(error);
      }
    };

    fetchAuctionDetails();
  }, [auctionId]);

  const fetchBidHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/allBids/${auctionId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBidHistory(response.data.bids);
      setHighestBid(response.data.highestBid);
    } catch (error) {
      console.error("Error fetching bid history:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    if (ms <= 0) return "Auction Ended";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const placeBid = async () => {
    if (!bidAmount || bidAmount <= 0) {
      setError("Please enter a valid bid amount.");
      return;
    }

    if (highestBid && bidAmount <= highestBid.amount && amount) {
      alert("Please enter more than the recent bid amount.");
      return;
    }

    if (bidAmount <= auction.Product?.startingPrice) {
      alert("Your bid must be greater than the starting price.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3001/api/placeBid",
        { auctionId, bidAmount },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Bid placed successfully!");
      fetchBidHistory();
      setBidAmount("");
      setError("");
    } catch (error) {
      setError("Failed to place bid. Please try again.");
      console.error(error);
    }
  };

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 text-white">
  //       <div className="bg-red-600/20 p-8 rounded-xl border border-red-500 flex items-center">
  //         <p className="mr-4">{error}</p>
  //         <button
  //           onClick={() => navigate("/Home")}
  //           className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
  //         >
  //           Go Back
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  if (!auction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-4 text-white">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative group">
            <div className="w-[45homvw] rounded-2xl overflow-hidden shadow-2xl">
              {auction.Product?.imageUrl ? (
                <img
                  src={auction.Product.imageUrl}
                  alt={auction.Product.name}
                  className="w-[45vw] h-[50vh] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="h-[500px] bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
            </div>
            <div className="absolute top-6 right-6 bg-black/60 px-4 py-2 rounded-full flex items-center space-x-2">
              <Timer className="text-blue-400" />
              <span className="text-lg font-semibold">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="space-y-6 bg-blue-500 rounded-md p-3">
            <h1 className="text-4xl font-bold mb-3">{auction.Product?.name}</h1>
            <p className="text-gray-300 text-lg">
              {auction.Product?.description}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white text-black p-5 rounded-xl space-y-2">
                <div className="flex items-center space-x-3">
                  <Tag className="text-green-400" />
                  <h3 className="font-semibold">Starting Price</h3>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  ₹{auction.Product?.startingPrice}
                </p>
              </div>

              <div className="bg-white text-black p-5 rounded-xl space-y-2">
                <div className="flex items-center space-x-3">
                  <Award className="text-yellow-400" />
                  <h3 className="font-semibold">Highest Bid</h3>
                </div>
                <p className="text-2xl font-bold text-yellow-400">
                  {highestBid ? `₹${highestBid.amount}` : "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-white text-black p-6 rounded-xl space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="text-green-400" />
                <span className="font-semibold">
                  Auction Starts:{" "}
                  {new Date(auction.auctionStart).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-red-400" />
                <span className="font-semibold">
                  Auction Ends:{" "}
                  {new Date(auction.auctionEnd).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="bg-white text-black p-6 rounded-xl space-y-4">
              <div className="relative">
                <input
                  type="number"
                  placeholder="Enter your bid amount"
                  className="w-full px-4 py-2 bg-blue-100 text-black border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              <button
                onClick={placeBid}
                disabled={timeLeft <= 0}
                className={`w-full ${
                  timeLeft <= 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 active:to-green-700"
                } text-white font-bold py-2 px-4 rounded-lg transition duration-300`}
              >
                {timeLeft <= 0 ? "Auction Ended" : "Place Bid"}
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="bg-white text-black p-6 rounded-xl space-y-4">
              <h2 className="text-xl font-bold">Bid History</h2>
              {bidHistory.length > 0 ? (
                <ul className="space-y-3 max-h-40 overflow-y-auto">
                  {bidHistory.map((bid, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-lg"
                    >
                      <span className="font-semibold">
                        {bid.User.username || "Unknown"}
                      </span>

                      <span className="font-semibold">{bid.bidder}</span>

                      <span className="text-yellow-400 font-bold">
                        ₹{bid.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No bids placed yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
