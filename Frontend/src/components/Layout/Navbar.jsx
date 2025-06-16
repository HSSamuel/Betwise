import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { useWallet } from "../../hooks/useWallet";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { balance } = useWallet();

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "bg-gray-900 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-green-400">
              BetWise
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={navLinkClass} end>
                  Home
                </NavLink>
                {user && (
                  <NavLink to="/my-bets" className={navLinkClass}>
                    My Bets
                  </NavLink>
                )}
                {user && (
                  <NavLink to="/wallet" className={navLinkClass}>
                    Wallet
                  </NavLink>
                )}
                {user?.role === "admin" && (
                  <NavLink to="/admin" className={navLinkClass}>
                    Admin
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="text-sm text-green-400 font-semibold">
                  ${balance.toFixed(2)}
                </div>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FaUserCircle size={20} />
                  <span>{user.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-600 px-3 py-1 text-sm font-medium text-white rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
