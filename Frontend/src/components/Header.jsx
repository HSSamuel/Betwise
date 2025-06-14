// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-green-600">
          BetWise
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-green-600">
            Home
          </Link>
          <Link to="/live" className="text-gray-600 hover:text-green-600">
            Live
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-green-600">
            Profile
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="font-semibold text-purple-600 hover:text-purple-800"
            >
              Admin Panel
            </Link>
          )}
        </div>

        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-sm hidden sm:block">
              Welcome, {user?.firstName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
