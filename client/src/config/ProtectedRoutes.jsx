
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

// inside your component:
const navigate = useNavigate();


const response = await axiosInstance.post("/api/v1/admin/login", user);

if (response.data.success && response.data.admin) {
  localStorage.setItem("isAdmin", "true");
  navigate("/home");  
} else {
  alert("You are not authorized as an admin.");
}
