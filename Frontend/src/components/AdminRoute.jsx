import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "./shared/Spinner";

const AdminRoute = ({ children }) => {
  const { user, isLoggedIn, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Spinner />;
  if (!isLoggedIn || user?.role !== "admin") return <Navigate to="/" />;
  return children;
};

export default AdminRoute;
