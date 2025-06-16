import React, { useState } from "react";
import { useBetSlip } from "../../contexts/BetSlipContext";
import { FaTrash } from "react-icons/fa";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { placeBet, placeMultiBet } from "../../services/betService";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const BetSlip = () => {
  const { selections, removeSelection, clearSelections, totalOdds } =
    useBetSlip();
  const [stake, setStake] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePlaceBet = async () => {
    if (!user) {
      toast.error("Please log in to place a bet.");
      return;
    }
    if (selections.length === 0) {
      toast.error("Your bet slip is empty.");
      return;
    }
    if (!stake || parseFloat(stake) <= 0) {
      toast.error("Please enter a valid stake amount.");
      return;
    }
    setLoading(true);
    try {
      if (selections.length === 1) {
        const sel = selections[0];
        await placeBet({
          gameId: sel.gameId,
          outcome: sel.outcome,
          stake: parseFloat(stake),
        });
      } else {
        const multiBetData = {
          stake: parseFloat(stake),
          selections: selections.map((s) => ({
            gameId: s.gameId,
            outcome: s.outcome,
          })),
        };
        await placeMultiBet(multiBetData);
      }
      toast.success("Bet placed successfully!");
      clearSelections();
      setStake("");
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to place bet.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
      <h2 className="text-xl font-bold border-b pb-2 mb-4">Bet Slip</h2>
      {selections.length === 0 ? (
        <p className="text-gray-500">
          Your bet slip is empty. Click on odds to add a selection.
        </p>
      ) : (
        <>
          {selections.map((sel) => (
            <div key={sel.gameId} className="mb-3 p-2 border rounded">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold">
                  {sel.gameDetails.homeTeam} vs {sel.gameDetails.awayTeam}
                </p>
                <button
                  onClick={() => removeSelection(sel.gameId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-sm text-gray-600">Your Pick: {sel.outcome}</p>
              <p className="text-sm text-gray-800 font-bold">
                Odds: {sel.odds.toFixed(2)}
              </p>
            </div>
          ))}
          <div className="mt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Odds:</span>
              <span>{totalOdds.toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <label
                htmlFor="stake"
                className="block text-sm font-medium text-gray-700"
              >
                Stake Amount ($)
              </label>
              <input
                type="number"
                id="stake"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                placeholder="0.00"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Potential Winnings:</span>
              <span>${(stake * totalOdds).toFixed(2)}</span>
            </div>
            <Button
              onClick={handlePlaceBet}
              loading={loading}
              disabled={loading}
              className="w-full mt-4"
            >
              {user ? "Place Bet" : "Login to Bet"}
            </Button>
            {user && (
              <Button
                onClick={clearSelections}
                variant="danger"
                className="w-full mt-2"
              >
                Clear Slip
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BetSlip;
