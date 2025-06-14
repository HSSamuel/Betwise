// src/components/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  // Style for active links
  const activeLinkStyle = {
    backgroundColor: "#16a34a", // green-600
    color: "white",
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin"
            end // 'end' ensures this only matches the exact path
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/games"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            Game Management
          </NavLink>
          {/* We will add links for User Management and Withdrawals here later */}
        </nav>
      </aside>
      <main className="flex-grow p-6">
        <Outlet />{" "}
        {/* This is where the child route components will be rendered */}
      </main>
    </div>
  );
};

export default AdminLayout;
