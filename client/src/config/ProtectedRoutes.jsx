import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "true") {
      // User is considered an admin
      return;
    } else {
      alert("You are not authorized as an admin.");
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
