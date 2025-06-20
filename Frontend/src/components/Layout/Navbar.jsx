import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useWallet } from "../../contexts/WalletContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { formatCurrency } from "../../utils/helpers";
import logoImg from "../../assets/logo.png";
import ThemeToggle from "../ui/ThemeToggle"; // Make sure this is imported

const Navbar = () => {
  const { user, logout } = useAuth();
  const { balance } = useWallet();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? // FIX: Changed the dark mode active background for better visibility.
          "bg-green-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Logo and main nav links... */}
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-green-400"
            >
              <img
                src={logoImg}
                alt="BetWise Logo"
                className="h-5 mr-2 -ml-2"
              />
              <span>BetWise</span>
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
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle /> {/* ADDED HERE */}
            {user ? (
              <>
                <div className="text-sm text-green-400 font-semibold">
                  {formatCurrency(balance)}
                </div>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <img
                    src={
                      user.profilePicture ||
                      `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&color=fff`
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
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
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClass} end>
              Home
            </NavLink>
            {user && (
              <NavLink to="/my-bets" className={mobileNavLinkClass}>
                My Bets
              </NavLink>
            )}
            {user && (
              <NavLink to="/wallet" className={mobileNavLinkClass}>
                Wallet
              </NavLink>
            )}
            {user?.role === "admin" && (
              <NavLink to="/admin" className={mobileNavLinkClass}>
                Admin
              </NavLink>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center justify-between px-5">
              {user ? (
                <div className="flex items-center">
                  <img
                    src={
                      user.profilePicture ||
                      `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&color=fff`
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.username}
                    </div>
                    <div className="text-sm font-medium text-green-400 mt-1">
                      {formatCurrency(balance)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-x-2">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}
              <ThemeToggle /> {/* ADDED HERE FOR MOBILE */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
