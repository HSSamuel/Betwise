import React, { useState } from "react";
import toast from "react-hot-toast";
import { useBetSlip } from "../../contexts/BetSlipContext";
import { useApi } from "../../hooks/useApi";
import * as betService from "../../services/betService";
// --- THIS IS THE CORRECTED IMPORT ---
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BetSlip = () => {
  const { selections, removeSelection, clearSelections, totalOdds } =
    useBetSlip();
  const [stake, setStake] = useState("");
  const [betType, setBetType] = useState("Single");
  const { user } = useAuth();
  const navigate = useNavigate();

  const { request: placeBetApi, loading: placeBetLoading } = useApi(null, {
    onSuccess: (data) => {
      toast.success(data.msg || "Bet placed successfully!");
      clearSelections();
      setStake("");
    },
  });

  const potentialPayout =
    betType === "Multi" && selections.length > 0 && parseFloat(stake) > 0
      ? totalOdds * parseFloat(stake)
      : 0;

  const handlePlaceBet = async () => {
    if (!user) {
      toast.error("Please log in to place a bet.");
      navigate("/login");
      return;
    }
    if (selections.length === 0 || !stake || parseFloat(stake) <= 0) {
      toast.error("Please add selections and enter a valid stake.");
      return;
    }

    if (betType === "Single") {
      if (selections.length > 1) {
        toast.error("For Single bets, please place them one at a time.");
        return;
      }
      const singleSelection = selections[0];
      const betData = {
        gameId: singleSelection.gameId,
        outcome: singleSelection.outcome,
        stake: parseFloat(stake),
      };
      await placeBetApi(betService.placeSingleBet, betData);
    } else {
      // betType is 'Multi'
      if (selections.length < 2) {
        toast.error("A multi-bet requires at least 2 selections.");
        return;
      }
      const betData = {
        stake: parseFloat(stake),
        selections: selections.map((s) => ({
          gameId: s.gameId,
          outcome: s.outcome,
        })),
      };
      await placeBetApi(betService.placeMultiBet, betData);
    }
  };

  // JSX part remains the same
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-bold border-b pb-2 mb-4">Bet Slip</h3>
      <div className="space-y-2">
        {selections.map((selection) => (
          <div
            key={selection.gameId}
            className="flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-semibold">{`${selection.gameDetails.homeTeam} vs ${selection.gameDetails.awayTeam}`}</p>
              <p className="text-gray-600">
                {selection.outcome} @ {selection.odds.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeSelection(selection.gameId)}
              className="text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bet Type
          </label>
          <select
            value={betType}
            onChange={(e) => setBetType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="Single">Single</option>
            <option value="Multi">Multi</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="stake"
            className="block text-sm font-medium text-gray-700"
          >
            Stake ($)
          </label>
          <input
            type="number"
            id="stake"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="w-full p-2 mt-1 border rounded-md"
            placeholder="Enter stake"
          />
        </div>
        <div className="text-right font-bold text-lg">
          {betType === "Multi" && (
            <p>
              Total Odds:{" "}
              <span className="text-green-600">{totalOdds.toFixed(2)}</span>
            </p>
          )}
          <p>
            Potential Payout:{" "}
            <span className="text-green-600">
              ${potentialPayout.toFixed(2)}
            </span>
          </p>
        </div>
        <button
          onClick={handlePlaceBet}
          disabled={placeBetLoading}
          className="w-full mt-4 bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400"
        >
          {placeBetLoading ? "Placing Bet..." : "Place Bet"}
        </button>
        <button
          onClick={clearSelections}
          className="w-full mt-2 bg-gray-200 text-gray-700 p-2 rounded-lg text-sm hover:bg-gray-300"
        >
          Clear Slip
        </button>
      </div>
    </div>
  );
};

export default BetSlip;
