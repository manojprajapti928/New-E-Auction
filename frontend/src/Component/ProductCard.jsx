import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
export default function ProductCard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(""); // Error handling

  // Function to fetch products
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3001/api/getProducts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(response.data);
      console.log("Full API Response:", response);
    } catch (err) {
      console.error("Error fetching products:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch product data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    console.log("Attempting to delete product:", productId);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/deleteProduct/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Delete response:", response.data);
      alert("Product deleted successfully");
      fetchProducts(); // Refresh the product list after deletion
    } catch (err) {
      console.error("Error deleting product:", err.response || err.message);
      alert("Failed to delete the product. Please try again.");
    }
  };

  // Effect to call fetchProducts on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg bg-gray-800 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div>
      <Sidebar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 py-8 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 gap-6 m-11 h-full w-[70vw] rounded-md">
        {products.map((item) => (
          <div
            key={item.id}
            className="rounded-lg overflow-hidden hover:scale-105 transition-transform bg-gray-300 flex flex-row shadow-lg shadow-black space-y-7"
          >
            <div className="flex flex-row">
              <img
                src={item.imageUrl}
                alt={item.name || "Product Image"}
                className="h-[30vh] w-[21vw] m-3 rounded-md"
              />
            </div>
            <div className="flex flex-col flex-wrap text-xl">
              <div className="flex flex-col">
                <h1 className="text-lg">
                  <span className="font-bold">Name: </span>
                  {item.name || "N/A"}
                </h1>
                <p>
                  {" "}
                  <span className="font-bold"> Description: </span>
                  {item.description || "N/A"}
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Price: </span>
                  Rs.{item.startingPrice || "N/A"}/-
                </p>
                <p>
                  <span className="font-bold">Auction Start Date: </span>
                  {item.auctionStart
                    ? new Date(item.auctionStart).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  <span className="font-bold">Auction End Date: </span>
                  {item.auctionEnd
                    ? new Date(item.auctionEnd).toLocaleString()
                    : "N/A"}
                </p>
                {/* <p>Category: {item.category || "N/A"}</p> */}
                <div>
                  <Link to={`/UpdateCard/${item.id}`}>
                    <button className="h-[7vh] w-[9vw] text-white bg-blue-700 rounded-md m-7 hover:bg-blue-600 active:bg-blue-700 scale-105 hover:scale-110">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="h-[7vh] w-[9vw] text-white bg-red-700 rounded-md m-3 hover:bg-red-600 active:bg-red-700 scale-105 hover:scale-110"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
