import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";

import Navbar from "./conponenets/Navbar";
import ProtectedRoute from "./config/ProtectedRoutes";
import Users from "./pages/Users";
import Products from "./pages/Products";

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
