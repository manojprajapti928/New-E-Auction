import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { use } from "../../../backend/routes/productRoutes";

export default function UpdateCard() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startingPrice: "",
    auctionStart: "",
    auctionEnd: "",
    imageUrl: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((formData) => {
      if (type === "file") {
        return {
          ...formData,
          [name]: files[0],
        };
      } else {
        return {
          ...formData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated. Please log in again.");
      return;
    }

    try {
      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }

      const response = await axios.put(
        `http://localhost:3001/api/updateProduct/${productId}`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product is updated successfully...");
      console.log("Response:", response.data);
      navigate("/ProductCard", { replace: true });
    } catch (err) {
      console.error("Error:", err);
      alert("Product is not updated...");
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-b from-gray-900 to-gray-700 overflow-hidden min-h-screen">
      <div className="m-16 h-[80vh] w-[59vw] bg-gray-300 flex justify-center items-center rounded-md shadow-lg shadow-black">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1 className="text-center text-2xl font-bold">Update Form</h1>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name here"
              className="mt-1 mb-1 py-2 rounded-md text-lg"
            />
            <label htmlFor="description" className="w-[45vw] text-lg">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="mt-1 mb-1 py-2 rounded-md text-lg"
            />
            <label htmlFor="startingPrice" className="w-[45vw] text-lg">
              Starting Price:
            </label>
            <input
              type="number"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              placeholder="Enter starting price"
              className="mt-1 mb-1 py-2 rounded-md text-lg"
            />
            <label htmlFor="auctionStart" className="w-[45vw] text-lg">
              Auction Start:
            </label>
            <input
              type="datetime-local"
              name="auctionStart"
              value={formData.auctionStart}
              onChange={handleChange}
              placeholder="Enter auction start"
              className="mt-1 mb-1 py-2 rounded-md text-lg"
            />
            <label htmlFor="auctionEnd" className="w-[45vw] text-lg">
              Auction End:
            </label>
            <input
              type="datetime-local"
              name="auctionEnd"
              value={formData.auctionEnd}
              onChange={handleChange}
              placeholder="Enter auction end"
              className="mt-1 mb-1 py-2 rounded-md text-lg"
            />
            <label htmlFor="imageUrl" className="w-[45vw] text-lg">
              Image:
            </label>
            <input
              type="file"
              accept="image/*"
              name="imageUrl"
              onChange={handleChange}
              className="mt-1 mb-1 py-2 rounded-md text-lg"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              type="submit"
              className="bg-blue-700 w-auto h-[5vh] mt-3 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
