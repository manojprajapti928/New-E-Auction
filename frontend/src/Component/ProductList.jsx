import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen w-full text-white">
      {/* <div className="flex flex-col gap-6 justify-center w-full p-4 shadow-xl shadow-black"> */}
      {product.length > 0 ? (
        <div className="overflow-x-auto shadow-lg shadow-black rounded-lg m-3">
          <h1 className="text-center text-xl m-1 text-black bg-slate-300">Product Table</h1>
          <table className="min-w-full border-collapse border border-gray-400 bg-slate-300 text-black text-center">
            <thead className="text-center">
              <tr className="bg-blue-700 text-white text-center">
                <th className="border border-gray-500 px-4 py-2">S.No.</th>
                <th className="border border-gray-500 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-500 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-500 px-4 py-2">
                  Starting Price
                </th>
                <th className="border border-gray-500 px-4 py-2">
                  Auction Start
                </th>
                <th className="border border-gray-500 px-4 py-2">
                  Auction End
                </th>
                {/* <th className="border border-gray-500 px-4 py-2">Image URL</th> */}
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
                <tr
                  key={product.id}
                  className="hover:bg-green-500 hover:transition-all hover:scale-100 hover:text-white hover:font-bold"
                >
                  <td className="border border-gray-500 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {product.name || "N/A"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {product.description || "N/A"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {product.startingPrice || "N/A"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {product.auctionStart || "N/A"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {product.auctionEnd || "N/A"}
                  </td>
                  {/* <td className="border border-gray-500 px-4 py-2">
                    {product.imageUrl || "N/A"}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-300">No users found.</p>
      )}
      {/* </div> */}
    </div>
  );
};

export default ProductList;
