import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [user,setUser]=useState({
    email:"",
    password:""

  })

const handleChange = (e) => {
  const { name, value } = e.target;
  setUser((prevUser) => {
    const updatedUser = { ...prevUser, [name]: value };
    
    return updatedUser;
  });
};
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user.password) {
    alert("Password is required");
    return;
  }

  console.log("Login attempt:", user);  // Log the user object to check if email and password are set

  try {
    const response = await axiosInstance.post("/api/v1/admin/login", user);
    console.log(response.data);
localStorage.setItem("isAdmin", "true");
localStorage.setItem("email", user.email);
    if (response.data.success && response.data.admin) {
      localStorage.setItem("isAdmin", "true");
      navigate("/home");
    } else {
      alert("You are not authorized as an admin.");
    }

    // Reset form
    setUser({
      email: "",
      password: ""
    });

  } catch (error) {
    console.error(
      "Error logging in:",
      error.response ? error.response.data : error.message
    );
    alert("An error occurred while logging in. Please try again.");
  }
};

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      
      <div className="w-full h-[40%] bg-blue-600 relative">
      
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[70%] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-white p-6 shadow-2xl rounded">
          <h2 className="text-xl text-center font-semibold mb-4">
            Login to QG
          </h2>
          <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
             
              className="mt-2 w-full sm:w-32 mx-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
