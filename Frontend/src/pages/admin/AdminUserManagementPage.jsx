import React, { useEffect, useState, useCallback } from "react";
import { useApi } from "../../hooks/useApi";
import {
  listUsers,
  adminDeleteUser,
  adminUpdateUserRole,
} from "../../services/adminService";
import Spinner from "../../components/ui/Spinner";
import Pagination from "../../components/ui/Pagination";
import { FaTrash, FaUserShield, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDebounce } from "../../hooks/useDebounce"; // We will create this new hook

const UserRow = ({ user, refetch }) => {
  const handleDelete = async () => {
    if (
      window.confirm(`Are you sure you want to delete user ${user.username}?`)
    ) {
      try {
        await adminDeleteUser(user._id);
        toast.success("User deleted.");
        refetch();
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to delete user.");
      }
    }
  };

  const handleRoleChange = async () => {
    const newRole = user.role === "admin" ? "user" : "admin";
    if (window.confirm(`Change ${user.username}'s role to ${newRole}?`)) {
      try {
        await adminUpdateUserRole(user._id, newRole);
        toast.success("Role updated.");
        refetch();
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to update role.");
      }
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 font-medium">{user.username}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">
        {user.firstName} {user.lastName}
      </td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 flex space-x-2">
        <button
          onClick={handleRoleChange}
          className="text-blue-500 hover:text-blue-700"
          title={`Change role to ${user.role === "admin" ? "user" : "admin"}`}
        >
          {user.role === "admin" ? <FaUserShield /> : <FaUser />}
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
          title="Delete user"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

const AdminUserManagementPage = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "" });
  const debouncedSearchTerm = useDebounce(filters.search, 500); // Debounce search input
  const { data, loading, error, request: fetchUsers } = useApi(listUsers);

  const fetchLatestUsers = useCallback(() => {
    const queryParams = { ...filters, search: debouncedSearchTerm };
    if (!queryParams.search) {
      delete queryParams.search;
    }
    fetchUsers(queryParams);
  }, [filters.page, debouncedSearchTerm, fetchUsers]); // Re-fetch when page or debounced search changes

  useEffect(() => {
    fetchLatestUsers();
  }, [fetchLatestUsers]);

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 })); // Reset to page 1 on search
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, username, or email..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full max-w-sm p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Joined
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  <Spinner />
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {data?.users.map((user) => (
              <UserRow key={user._id} user={user} refetch={fetchLatestUsers} />
            ))}
            {!loading && data?.users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={data?.currentPage || 1}
        totalPages={data?.totalPages || 1}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};

export default AdminUserManagementPage;
