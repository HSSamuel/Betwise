// src/components/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css"; // We'll create this dedicated CSS file

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-logo">
        <Link to="/">BetWise</Link>
      </div>
      <nav className="header-nav">
        <NavLink to="/">Home</NavLink>
        {isLoggedIn && <NavLink to="/wallet">My Wallet</NavLink>}
        {isLoggedIn && <NavLink to="/my-bets">My Bets</NavLink>}
        {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="header-user-info">
        {isLoggedIn ? (
          <>
            <span>Welcome, {user?.username}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <div className="login-prompt">
            {/* We will move the login form out of the sidebar later */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
