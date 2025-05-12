import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axiosInstance from "../utils/axiosInstance";
 

const Navbar = () => {
  const navigate = useNavigate();  

 
  const handleLogout = async () => {
    try {
      
      const response = await axiosInstance.post("/api/v1/admin/logout");

      if (response.status === 200) {
        // Clear authentication token from localStorage or cookies
        localStorage.removeItem("token");

       
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-between text-black h-15 m-2 w-full shadow-2xl px-8 rounded-md">
      {/* Left - Heading */}
      <div className="text-xl font-semibold">
        QuickyGiky
      </div>

      {/* Center - Navigation Links */}
      <div className="flex gap-6 justify-center">
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>
      </div>

      {/* Logout Button */}
      <FiLogOut onClick={handleLogout} className="cursor-pointer" />
    </div>
  );
};

export default Navbar;
