// src/components/BetSlip.jsx
import React, { useState, useMemo } from "react";
import { useBetSlip } from "../context/BetSlipContext";
import axios from "axios";

// The base URL for your deployed backend API
const API_BASE_URL = "https://betwise-project.onrender.com/api/v1";

const BetSlip = () => {
  const { selections, removeSelection, clearBetSlip } = useBetSlip();
  const [stake, setStake] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Calculate total odds using useMemo for efficiency
  const totalOdds = useMemo(() => {
    if (selections.length === 0) return 0;
    // The 'reduce' function multiplies all the odds together
    return selections.reduce((acc, current) => acc * current.odds, 1);
  }, [selections]);

  const potentialWinnings =
    stake > 0 && totalOdds > 0 ? (stake * totalOdds).toFixed(2) : "0.00";

  const handlePlaceBet = async () => {
    if (selections.length === 0 || !stake || stake <= 0) {
      setError("Please add selections and enter a valid stake.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    // IMPORTANT: In a real app, you would get this from your global auth state
    const authToken = localStorage.getItem("authToken"); // Example of getting token

    if (!authToken) {
      setError("You must be logged in to place a bet.");
      setIsLoading(false);
      return;
    }

    const isMultiBet = selections.length > 1;
    const endpoint = isMultiBet
      ? `${API_BASE_URL}/bets/multi`
      : `${API_BASE_URL}/bets`;

    let payload;
    if (isMultiBet) {
      payload = {
        stake: parseFloat(stake),
        selections: selections.map((s) => ({
          gameId: s.game._id,
          outcome: s.outcome,
        })),
      };
    } else {
      payload = {
        gameId: selections[0].game._id,
        outcome: selections[0].outcome,
        stake: parseFloat(stake),
      };
    }

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSuccess("Bet placed successfully!");
      clearBetSlip();
      setStake("");
    } catch (err) {
      setError(
        err.response?.data?.msg || "Failed to place bet. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg sticky top-24">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">Bet Slip</h3>

      {selections.length === 0 ? (
        <p className="text-sm text-gray-500">Your bet slip is empty.</p>
      ) : (
        <div className="space-y-3 mb-4">
          {selections.map((selection) => (
            <div key={selection.game._id} className="text-sm border-b pb-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{selection.outcomeDescription}</p>
                <button
                  onClick={() => removeSelection(selection.game._id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  X
                </button>
              </div>
              <p className="text-xs text-gray-600">
                {selection.game.homeTeam} vs {selection.game.awayTeam}
              </p>
            </div>
          ))}
        </div>
      )}

      {selections.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Total Odds:</span>
            <span className="font-bold">{totalOdds.toFixed(2)}</span>
          </div>
          <div>
            <label htmlFor="stake" className="block text-sm font-semibold mb-1">
              Stake (NGN)
            </label>
            <input
              type="number"
              id="stake"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              placeholder="Enter stake amount"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Payout:</span>
            <span>NGN {potentialWinnings}</span>
          </div>
          <button
            onClick={handlePlaceBet}
            disabled={isLoading || selections.length === 0}
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          >
            {isLoading ? "Placing Bet..." : "Place Bet"}
          </button>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          {success && <p className="text-green-500 text-xs mt-2">{success}</p>}
        </div>
      )}
    </div>
  );
};

export default BetSlip;
