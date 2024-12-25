// import axios from "axios";
// import React, { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors
//     const payload = {
//       email: email,
//       password: password,
//     };

//     // Basic client-side validation
//     if (!email.includes("@")) {
//       setError("Invalid email format");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         "http://localhost:3001/api/login",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           // body:email, password,
//         }
//       );
//       // console.log(response, "response");

//       const data = await response.data;
//       // console.log(data, "json data ");
//       if (response.status == 200) {
//         localStorage.setItem("token", data.token);

//         // console.log(data.token);
//         if (data.role === "admin") {
//           navigate("/AdminDashboard");
//         } else if (data.role === "user") {
//           navigate("/Home");
//         }
//       } else {
//         setError(data.error || "Login failed. Please check your credentials.");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.log(err, "Error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700">
//       <form
//         className="shadow-lg shadow-black rounded-lg p-6 w-full max-w-sm bg-gray-500"
//         onSubmit={handleLogin}
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
//           Admin Login
//         </h2>

//         {/* Email */}
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="block text-gray-900 font-medium mb-2"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-gray-900 font-medium mb-2"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="******"
//             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         {/* Login Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mb-3"
//         >
//           Login
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate("/")}
//           className={`w-full py-2 px-4 rounded-md text-white transition duration-300 bg-blue-500 hover:bg-blue-600}`}
//         >
//           User Login
//         </button>
//       </form>
//     </div>
//   );
// }
