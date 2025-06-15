// src/components/WithdrawalRequests.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getWithdrawalRequests, processWithdrawal } from "../api/adminService";

const WithdrawalRequests = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchRequests = async () => {
    try {
      const data = await getWithdrawalRequests(token);
      setRequests(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, [token]);

  const handleProcessRequest = async (id, status) => {
    setError("");
    setSuccess("");
    if (!window.confirm(`Are you sure you want to ${status} this request?`)) {
      return;
    }
    try {
      const res = await processWithdrawal(id, status, token);
      setSuccess(res.msg);
      // Refresh the list after processing
      fetchRequests();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="withdrawal-management">
      <h2>Pending Withdrawal Requests</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req._id}>
                <td>{new Date(req.createdAt).toLocaleString()}</td>
                <td>{req.user?.username}</td>
                <td>{req.user?.email}</td>
                <td>${req.amount.toFixed(2)}</td>
                <td className="actions-cell">
                  <button
                    className="approve-btn"
                    onClick={() => handleProcessRequest(req._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleProcessRequest(req._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No pending withdrawal requests.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalRequests;
