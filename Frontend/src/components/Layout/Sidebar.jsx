import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaGamepad,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const linkClass =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";
  const activeLinkClass = "bg-gray-200 dark:bg-gray-700";

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              <FaTachometerAlt className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              <FaUsers className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/games"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              <FaGamepad className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Games</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/withdrawals"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              <FaMoneyBillWave className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Withdrawals</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/risk"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              <FaShieldAlt className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Risk Management
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
