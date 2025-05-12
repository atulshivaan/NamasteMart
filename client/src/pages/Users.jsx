import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FaCheckCircle } from "react-icons/fa";

const Users = () => {
  const [users, setUser] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/get-users");
        if (res.data.success) {
          setUser(res.data.users || []);
        } else {
          console.error("No user found:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-6 p-6 bg-gray-100 h-screen">
      {/* Full Width Add User Button */}
      <div className="w-full flex justify-center mb-4">
        <button
          className="w-64 p-2 bg-blue-500 text-white rounded"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "Cancel" : "Add User"}
        </button>
      </div>
      
      {/* Divider */}
      <hr className="w-full" />
      <br />
      
      {/* User Cards */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user, index) => (
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

              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">📞 {user.number}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
