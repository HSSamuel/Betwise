// src/components/AdminRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // First, check if the user is logged in at all
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Next, check if the logged-in user has the 'admin' role
  if (user?.role !== "admin") {
    // If not an admin, redirect them to the homepage
    return <Navigate to="/" replace />;
  }

  // If they are an admin, render the requested page
  return children;
};

export default AdminRoute;
