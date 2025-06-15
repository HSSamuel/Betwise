import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "./shared/Spinner";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Spinner />;
  if (!isLoggedIn) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
