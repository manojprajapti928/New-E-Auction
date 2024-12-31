import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaTrash } from "react-icons/fa";

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

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:3001/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setUsers(users.filter((user) => user.id !== id)); // Remove the deleted user from the state
          alert("User deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Please try again.");
        });
    }
  };

  if (loading) return <p className="text-center">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen w-full text-white">
        {users.length > 0 ? (
          <div className="overflow-x-auto shadow-lg shadow-black rounded-lg m-3 ml-[4rem]">
            <h1 className="text-center text-xl m-1 text-white bg-blue-600 ">
              Users Table
            </h1>
            <table className="min-w-full border-collapse border border-gray-400 bg-gray-300 text-black text-center">
              <thead className="text-center">
                <tr className="bg-blue-600 text-white text-center">
                  <th className="border border-gray-500 px-4 py-2">Image</th>
                  <th className="border border-gray-500 px-4 py-2">
                    User Name
                  </th>
                  <th className="border border-gray-500 px-4 py-2">Email</th>
                  <th className="border border-gray-500 px-4 py-2">Role</th>
                  <th className="border border-gray-500 px-4 py-2">Address</th>
                  <th className="border border-gray-500 px-4 py-2">City</th>
                  <th className="border border-gray-500 px-4 py-2">State</th>
                  <th className="border border-gray-500 px-4 py-2">Country</th>
                  <th className="border border-gray-500 px-4 py-2">
                    Contact No
                  </th>
                  <th className="border border-gray-500 px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((data, index) => (
                  <tr
                    key={data.id}
                    className="hover:bg-gray-400 hover:transition-all hover:scale-100 hover:text-white hover:font-bold"
                  >
                    <td className="border border-gray-500 px-4 py-2">
                      <img
                        src={data.imageUrl}
                        alt={data.imageUrl}
                        className="h-[5vh] w-[3vw] rounded-full"
                      />
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {data.username}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {data.email}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {data.role}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {data.address}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {data.city}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {data.state}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {data.country}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {data.contactNo}
                    </td>
                    <td className="border border-gray-500 px-4 py-2 hover:bg-red-500">
                      <FaTrash
                        className=" text-red-600 cursor-pointer"
                        onClick={() => deleteUser(data.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
