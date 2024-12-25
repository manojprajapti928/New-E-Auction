import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const navigate = useNavigate();

  // Initial state for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
   
    address: "",
    city: "",
    state: "",
    country: "",
    contactNo: "",
    imageUrl: null,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes (including file input)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setError("");  // Clear error on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation for all fields (including image)
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
    
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.contactNo ||
      !formData.imageUrl
    ) {
      setError("All fields are required.");
      return;
    }

    // Prepare FormData for file upload
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:3001/api/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response,"datttttttttttta");

      if (response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg shadow-black rounded-lg p-6 w-full max-w-md bg-gray-500"
      >
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Registration Form
        </h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border rounded-md px-3 py-2 bg-white"
            required
          />
        </div>


        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter your state"
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder="Enter your contact number"
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
