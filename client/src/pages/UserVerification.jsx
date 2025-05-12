import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../utils/axiosInstance";

const UserVerification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  

  // You can optionally get email from navigation state if you passed it during registration
  // const email = location.state?.email || "";

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Use your axiosInstance to make the request
    const response = await axiosInstance.post("/api/v1/verify-user", {
      email,
      code: otp,
    });

    console.log("Verification successful:", response.data);
    alert("User verified successfully!");
    navigate("/users");
  } catch (error) {
    console.error("Verification failed:", error.response?.data || error.message);
    alert("Verification failed. Please check your code and try again.");
  }
};


  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-xl font-semibold text-center">Verify Your Account</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md"
          required
        />

        <input
          type="text"
          placeholder="Enter verification code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 rounded-md"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default UserVerification;
