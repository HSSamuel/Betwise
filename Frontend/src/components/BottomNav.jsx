// src/components/BottomNav.jsx
import React from "react";
import { Link } from "react-router-dom";

// You would typically use an icon library like 'react-icons' here
// For example: import { FiHome, FiRadio } from 'react-icons/fi';

const BottomNav = () => {
  return (
    // This nav is fixed to the bottom and hidden on medium screens and larger (md:hidden)
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around text-xs">
      <Link to="/" className="flex flex-col items-center text-gray-600 p-2">
        {/* <FiHome size={20} /> */}
        <span>Home</span>
      </Link>
      <Link to="/live" className="flex flex-col items-center text-gray-600 p-2">
        {/* <FiRadio size={20} /> */}
        <span>Live</span>
      </Link>
      <Link
        to="/betslip"
        className="flex flex-col items-center text-gray-600 p-2"
      >
        {/* Icon for Bet Slip */}
        <span>Bet Slip</span>
      </Link>
      <Link
        to="/profile"
        className="flex flex-col items-center text-gray-600 p-2"
      >
        {/* <FiUser size={20} /> */}
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
