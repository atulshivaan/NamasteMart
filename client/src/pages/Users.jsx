import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddUser = () => {
    navigate("/add-user");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/get-users");
        if (res.data.success) {
          setUsers(res.data.users || []);
        } else {
          console.error("No user found:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(lowerSearch) ||
      user.email?.toLowerCase().includes(lowerSearch) ||
      user.number?.toString().includes(lowerSearch)
    );
  });

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Top Bar */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <button
          className="w-full md:w-40  p-2 bg-blue-500 hover:bg-amber-50 hover:text-black text-white rounded shadow-md"
          onClick={handleAddUser}
        >
          Add User
        </button>

        <div className="flex items-center gap-2 border border-gray-300 rounded px-2">
          <input
            className="p-2 outline-none"
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch className="text-2xl text-gray-600" />
        </div>
      </div>

      {/* User Cards */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              className="relative w-64 p-4 bg-white rounded-2xl shadow-lg border border-gray-200"
            >
              {/* Verified Icon */}
              {user.isVerified && (
                <FaCheckCircle
                  className="absolute top-2 right-2 text-green-500"
                  title="Verified User"
                  size={20}
                />
              )}

              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">📞 {user.number}</p>

              <div className="flex justify-between mt-3">
                <button className="shadow-sm w-15 rounded-sm hover:text-violet-500">
                  Edit
                </button>
                <button className="shadow-sm w-20 rounded-sm  hover:text-red-500">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
