import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { adjustUserWallet, updateUserRole } from "../api/adminService";
import toast from "react-hot-toast";
import "./UserManagementModal.css";

const UserManagementModal = ({ user, onClose, onUpdate }) => {
  const { token } = useAuth();
  const [walletAmount, setWalletAmount] = useState(0);
  const [walletDescription, setWalletDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWalletAdjustment = async (e) => {
    e.preventDefault();
    if (walletAmount === 0 || !walletDescription) {
      return toast.error("Amount and description are required.");
    }
    setIsProcessing(true);
    toast
      .promise(
        adjustUserWallet(
          user._id,
          parseFloat(walletAmount),
          walletDescription,
          token
        ),
        {
          loading: "Adjusting wallet...",
          success: (res) => {
            onUpdate();
            setWalletAmount(0);
            setWalletDescription("");
            return <b>{res.msg}</b>;
          },
          error: (err) => <b>{err.message}</b>,
        }
      )
      .finally(() => setIsProcessing(false));
  };

  const handleRoleChange = async (newRole) => {
    setIsProcessing(true);
    toast
      .promise(updateUserRole(user._id, newRole, token), {
        loading: "Updating role...",
        success: (res) => {
          onUpdate();
          return <b>{res.msg}</b>;
        },
        error: (err) => <b>{err.message}</b>,
      })
      .finally(() => setIsProcessing(false));
  };

  if (!user) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-modal-btn">
          ×
        </button>
        <h2>Manage: {user.username}</h2>
        <div className="user-details">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Current Role:</strong> {user.role}
          </p>
          <p>
            <strong>Wallet Balance:</strong> ₦{user.walletBalance.toFixed(2)}
          </p>
        </div>

        <div className="modal-section">
          <h4>Change Role</h4>
          {user.role === "user" ? (
            <button
              onClick={() => handleRoleChange("admin")}
              disabled={isProcessing}
            >
              Promote to Admin
            </button>
          ) : (
            <button
              onClick={() => handleRoleChange("user")}
              disabled={isProcessing}
            >
              Demote to User
            </button>
          )}
        </div>

        <div className="modal-section">
          <h4>Adjust Wallet Balance</h4>
          <form onSubmit={handleWalletAdjustment}>
            <input
              type="number"
              placeholder="Amount (e.g., 50 or -20)"
              value={walletAmount}
              onChange={(e) => setWalletAmount(e.target.value)}
              disabled={isProcessing}
            />
            <input
              type="text"
              placeholder="Reason/Description"
              value={walletDescription}
              onChange={(e) => setWalletDescription(e.target.value)}
              disabled={isProcessing}
            />
            <button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Adjust Balance"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserManagementModal;
