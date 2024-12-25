import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getProducts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch product data.");
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-lg">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
        {product.length > 0 ? (
          <div className="overflow-x-auto shadow-md shadow-black rounded-lg m-3 ml-5">
            <h1 className="text-center text-2xl font-semibold m-3">Product Table</h1>
            <table className="min-w-full border-collapse border border-gray-400 bg-gray-300 text-black text-center text-sm sm:text-base">
              <thead className="text-center">
                <tr className="bg-gray-700 text-white">
                  <th className="border border-gray-500 px-6 py-3 text-lg">S.No.</th>
                  <th className="border border-gray-500 px-6 py-3 text-lg">Product Name</th>
                  <th className="border border-gray-500 px-6 py-3 text-lg">Description</th>
                  <th className="border border-gray-500 px-6 py-3 text-lg">Starting Price</th>
                  <th className="border border-gray-500 px-6 py-3 text-lg">Auction Start</th>
                  <th className="border border-gray-500 px-6 py-3 text-lg">Auction End</th>
                  <th className="border border-gray-500 px-6 py-3 text-lg">Image URL</th>
                </tr>
              </thead>
              <tbody>
                {product.map((product, index) => (
                  <tr
                    key={product.id}
                    className="hover:bg-green-500 hover:transition-all hover:scale-100 hover:text-white hover:font-bold"
                  >
                    <td className="border border-gray-500 px-6 py-3">{index + 1}</td>
                    <td className="border border-gray-500 px-6 py-3">{product.name || "N/A"}</td>
                    <td className="border border-gray-500 px-6 py-3">{product.description || "N/A"}</td>
                    <td className="border border-gray-500 px-6 py-3">{product.startingPrice || "N/A"}</td>
                    <td className="border border-gray-500 px-6 py-3">{product.auctionStart || "N/A"}</td>
                    <td className="border border-gray-500 px-6 py-3">{product.auctionEnd || "N/A"}</td>
                    <td className="border border-gray-500 px-6 py-3">{product.imageUrl || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-300 text-lg">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
