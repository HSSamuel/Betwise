import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <div className="text-sm">
            Logged in as:{" "}
            <span className="font-bold text-green-600">{user?.username}</span>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
