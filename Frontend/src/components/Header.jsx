// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // Later, you'll replace this with real logic from your global state
  const isLoggedIn = false; // Placeholder

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-green-600">
          BetWise
        </Link>
        {isLoggedIn ? (
          <Link to="/profile" className="text-gray-700 font-semibold">
            Profile
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
