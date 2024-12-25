import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users
    axios
      .get(`http://localhost:3001/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch user data.");
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <Sidebar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white flex justify-center ">
  <div className="w-3/4 overflow-hidden shadow-lg shadow-black rounded-lg mt-0">
    <h1 className="text-center text-2xl font-semibold py-4">Users Table</h1>
    <table className="w-full border-collapse border border-gray-500 bg-gray-300 text-black text-center">
      <thead>
        <tr className="bg-gray-700 text-white w-fu">
          <th className="border border-gray-500 px-6 py-3">S.No.</th>
          <th className="border border-gray-500 px-6 py-3">User Name</th>
          <th className="border border-gray-500 px-6 py-3">Email</th>
          <th className="border border-gray-500 px-6 py-3">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((data, index) => (
          <tr
            key={data.id}
            className="hover:bg-green-500 transition-all hover:text-white font-medium"
          >
            <td className="border border-gray-500 px-6 py-3">{data.id}</td>
            <td className="border border-gray-500 px-6 py-3">
              {data.username}
            </td>
            <td className="border border-gray-500 px-6 py-3">{data.email}</td>
            <td className="border border-gray-500 px-6 py-3">{data.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default UserList;
