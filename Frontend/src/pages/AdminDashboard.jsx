import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getPlatformStats,
  getAllUsers,
  getFinancialDashboard,
  getWithdrawalRequests,
  processWithdrawal,
} from "../api/adminService";
import UserManagementModal from "../components/UserManagementModal";
import Spinner from "../components/shared/Spinner";
import toast from "react-hot-toast";
import "./AdminDashboard.css";

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <p className="stat-title">{title}</p>
    <p className="stat-value">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [financials, setFinancials] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadAdminData = useCallback(async () => {
    if (token) {
      try {
        const [statsData, usersData, financialData, requestsData] =
          await Promise.all([
            getPlatformStats(token),
            getAllUsers(token),
            getFinancialDashboard(token),
            getWithdrawalRequests(token),
          ]);
        setStats(statsData);
        setUsers(usersData.users);
        setFinancials(financialData);
        setRequests(requestsData);
      } catch (error) {
        toast.error(`Failed to load admin data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  const handleManageClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = () => {
    // Refresh data after an update in the modal
    loadAdminData();
  };

  const handleProcessRequest = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this request?`))
      return;

    toast.promise(processWithdrawal(id, status, token), {
      loading: "Processing request...",
      success: (res) => {
        loadAdminData(); // Refresh all data
        return <b>{res.msg}</b>;
      },
      error: (err) => <b>{err.message}</b>,
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <section className="dashboard-section">
          <h2>Platform Overview</h2>
          <div className="stats-grid">
            <StatCard title="Total Users" value={stats?.totalUsers} />
            <StatCard title="Total Bets Placed" value={stats?.totalBets} />
            <StatCard title="Upcoming Games" value={stats?.upcomingGames} />
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Financials</h2>
          <div className="stats-grid">
            <StatCard
              title="Platform Revenue"
              value={`₦${financials?.platformRevenue.amount.toFixed(2)}`}
            />
            <StatCard
              title="Total Stakes"
              value={`₦${financials?.totalStakes.amount.toFixed(2)}`}
            />
            <StatCard
              title="Total Payouts"
              value={`₦${financials?.totalPayoutsToUsers.amount.toFixed(2)}`}
            />
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Pending Withdrawal Requests</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req._id}>
                      <td>{new Date(req.createdAt).toLocaleString()}</td>
                      <td>
                        {req.user?.username} ({req.user?.email})
                      </td>
                      <td>₦{req.amount.toFixed(2)}</td>
                      <td className="actions-cell">
                        <button
                          className="approve-btn"
                          onClick={() =>
                            handleProcessRequest(req._id, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() =>
                            handleProcessRequest(req._id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No pending requests.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>User Management</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>₦{user.walletBalance.toFixed(2)}</td>
                    <td>
                      <button
                        className="manage-btn"
                        onClick={() => handleManageClick(user)}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <UserManagementModal
          user={selectedUser}
          onClose={handleCloseModal}
          onUpdate={handleUserUpdate}
        />
      )}
    </>
  );
};

export default AdminDashboard;
