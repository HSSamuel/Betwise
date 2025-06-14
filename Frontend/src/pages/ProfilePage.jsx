// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BetHistoryTable from "../components/BetHistoryTable";
import ChangePasswordForm from "../components/ChangePasswordForm";
import SetLimitsForm from "../components/SetLimitsForm";

// Use the VITE_API_URL from your .env file to get the correct backend address
const API_BASE_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  // Get the user and token directly from our AuthContext.
  const { user, token } = useAuth();

  const [bets, setBets] = useState([]);
  const [loadingBets, setLoadingBets] = useState(true);

  useEffect(() => {
    // This function will fetch the user's bet history
    const fetchBetHistory = async () => {
      if (!token) {
        setLoadingBets(false);
        return;
      }

      try {
        setLoadingBets(true);
        // Build the full URL to the /bets endpoint
        const response = await axios.get(`${API_BASE_URL}/bets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBets(response.data.bets);
      } catch (error) {
        console.error("Failed to fetch bet history:", error);
      } finally {
        setLoadingBets(false);
      }
    };

    if (user) {
      // Only fetch bets if a user is logged in
      fetchBetHistory();
    }
  }, [token, user]); // Re-run if the user or token changes

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">
          Welcome, {user?.firstName || user?.username}!
        </h2>
        <p className="text-gray-600">
          Here you can manage your account and view your history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">
            Change Your Password
          </h3>
          <ChangePasswordForm />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">
            Set Betting Limits
          </h3>
          <SetLimitsForm />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">
          Your Bet History
        </h3>
        {loadingBets ? (
          <p>Loading your bets...</p>
        ) : (
          <BetHistoryTable bets={bets} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
