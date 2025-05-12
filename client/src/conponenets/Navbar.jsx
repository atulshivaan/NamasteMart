import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu } from "react-icons/fi";
import axiosInstance from "../utils/axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/admin/logout");
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="text-xl font-bold text-black">QuickyGiky</div>

      {/* Burger Icon */}
      <div
        className="md:hidden text-2xl cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FiMenu />
      </div>

      {/* Navigation Links */}
      <div
        className={`absolute md:static top-full left-0 w-full md:w-auto md:flex md:items-center bg-white z-10 transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col md:flex-row md:gap-6 text-black p-4 md:p-0">
          <Link to="/home" className="py-2 md:py-0">
            Home
          </Link>
          <Link to="/users" className="py-2 md:py-0">
            Users
          </Link>
          <Link to="/products" className="py-2 md:py-0">
            Products
          </Link>

          {/* Logout Icon for Mobile */}
          <div
            className="flex md:hidden items-center gap-2 text-red-600 mt-2 cursor-pointer"
            onClick={handleLogout}
          >
            <FiLogOut />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Logout Icon for Desktop */}
      <FiLogOut
        onClick={handleLogout}
        className="text-xl cursor-pointer hidden md:block text-red-600"
        title="Logout"
      />
    </nav>
  );
};

export default Navbar;
