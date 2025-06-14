// src/components/SetLimitsForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Define only the BASE part of the URL from your .env file
const API_BASE_URL = import.meta.env.VITE_API_URL;

const SetLimitsForm = () => {
  const { user, token } = useAuth();
  const [betCount, setBetCount] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.limits) {
      setBetCount(user.limits.weeklyBetCount.limit || 0);
      setStakeAmount(user.limits.weeklyStakeAmount.limit || 0);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Build the full, specific endpoint URL here
      await axios.post(
        `${API_BASE_URL}/users/limits`, // Correct endpoint for setting limits
        {
          weeklyBetCountLimit: betCount,
          weeklyStakeAmountLimit: stakeAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Your betting limits have been updated successfully!");
    } catch (error) {
      console.error("Failed to set limits:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Max Bets Per Week (0 for no limit)
        </label>
        <input
          type="number"
          value={betCount}
          onChange={(e) => setBetCount(parseInt(e.target.value, 10))}
          min="0"
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Max Stake Per Week (NGN, 0 for no limit)
        </label>
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(parseInt(e.target.value, 10))}
          min="0"
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
      </div>
      {message && <p className="text-green-500 text-sm">{message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save Limits"}
      </button>
    </form>
  );
};

export default SetLimitsForm;
