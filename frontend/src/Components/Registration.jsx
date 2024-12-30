import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/little.jpg";

export default function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    country: "",
    contactNo: "",
    imageUrl: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Create Account
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Username", name: "username", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Address", name: "address", type: "text" },
                { label: "City", name: "city", type: "text" },
                { label: "State", name: "state", type: "text" },
                { label: "Country", name: "country", type: "text" },
                { label: "Contact Number", name: "contactNo", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-800 font-medium mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                {
                  label: "Password",
                  name: "password",
                  show: showPassword,
                  setShow: setShowPassword,
                },
                {
                  label: "Confirm Password",
                  name: "confirmPassword",
                  show: showConfirmPassword,
                  setShow: setShowConfirmPassword,
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-800 font-medium mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={field.show ? "text" : "password"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <span
                      onClick={() => field.setShow((prev) => !prev)}
                      className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    >
                      {field.show ? "👁️" : "👁️‍🗨️"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="imageUrl"
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
