import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startingPrice: "",
    auctionStart: "",
    auctionEnd: "",
    imageUrl: "",
    // category: "", // Added for completeness
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((formData) => {
      if (type === "file") {
        return {
          ...formData,
          [name]: files[0], // Ensure the file is stored properly
        };
      } else {
        return {
          ...formData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const formPayload = new FormData();
    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }

    // Log the form data to see if the file is included
    for (const [key, value] of formPayload.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/createProduct`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data, "Data ");

      if (response.data.success) {
        alert("Product created successfully!");
        navigate("/ProductCard");
      } else {
        alert(response.data.message || "Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error.response || error.message);
      alert("Error creating product. Please try again.");
    }
  };

  return (
    <div>
      <Sidebar/>
    <div className="flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-700 h-[100vh] ">
      <div className="max-w-2xl mx-auto p-6  bg-gray-500 shadow-lg shadow-black rounded-lg">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Create Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              placeholder="Enter auction item name"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              placeholder="Enter auction item description"
              rows="4"
            ></textarea>
          </div>

          {/* Category Field */}
          {/* <div>
            <label className="block text-lg font-medium text-gray-900">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              placeholder="Enter category (e.g., Electronics, Furniture)"
            />
          </div> */}
          {/* Starting Price Field */}

          <div>
            <label className="block text-lg font-medium text-gray-900">
              Starting Price
            </label>
            <input
              type="number"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              placeholder="Enter starting price"
            />
          </div>

          {/* Auction Start Date Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900">
              Auction Start Date
            </label>
            <input
              type="datetime-local"
              name="auctionStart"
              value={formData.auctionStart}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Auction End Date Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900">
              Auction End Date
            </label>
            <input
              type="datetime-local"
              name="auctionEnd"
              value={formData.auctionEnd}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="imageUrl"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            onClick={() => navigate("/AdminDashboard")}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-900 transition"
          >
            submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
