import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useBetSlip } from "../contexts/BetSlipContext";
import { useAuth } from "../contexts/AuthContext";
import { placeMultiBet } from "../api/betService";
import { Link } from "react-router-dom";

const BetSlip = () => {
  const { selections, removeSelection, clearSelections } = useBetSlip();
  const { token, isLoggedIn, verifyUser } = useAuth();
  const [stake, setStake] = useState("");

  const totalOdds = useMemo(
    () => selections.reduce((acc, current) => acc * current.odds, 1),
    [selections]
  );
  const potentialPayout = useMemo(
    () => (stake > 0 ? (stake * totalOdds).toFixed(2) : "0.00"),
    [stake, totalOdds]
  );

  const handlePlaceBet = async () => {
    if (!isLoggedIn) return toast.error("Please log in to place a bet.");
    if (stake <= 0) return toast.error("Please enter a valid stake.");
    if (selections.length === 0)
      return toast.error("Please add selections to your bet slip.");

    const betData = {
      stake: parseFloat(stake),
      selections: selections.map((s) => ({
        gameId: s.gameId,
        outcome: s.outcome,
      })),
    };

    toast.promise(placeMultiBet(betData, token), {
      loading: "Placing bet...",
      success: (result) => {
        clearSelections();
        setStake("");
        verifyUser(); // Refresh user wallet balance
        return <b>{result.msg}</b>;
      },
      error: (err) => <b>{err.message}</b>,
    });
  };

  return (
    <div className="bet-slip">
      <h3>Bet Slip</h3>
      {selections.length === 0 ? (
        <p>Click on odds to add a bet.</p>
      ) : (
        selections.map((sel) => (
          <div key={sel.gameId} className="slip-item">
            <div>
              <p style={{ margin: 0, fontWeight: "500" }}>{sel.teamToBetOn}</p>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>
                {sel.gameDetails.homeTeam} vs {sel.gameDetails.awayTeam}
              </p>
            </div>
            <button onClick={() => removeSelection(sel.gameId)}>×</button>
          </div>
        ))
      )}
      {selections.length > 0 && (
        <div className="slip-summary">
          <p>Total Odds: {totalOdds.toFixed(2)}x</p>
          <input
            type="number"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            placeholder="Enter Stake (NGN)"
          />
          <p>Potential Payout: ₦{potentialPayout}</p>
          {isLoggedIn ? (
            <button onClick={handlePlaceBet}>Place Bet</button>
          ) : (
            <Link to="/login">
              <button>Login to Place Bet</button>
            </Link>
          )}
          <button
            onClick={clearSelections}
            style={{ backgroundColor: "#6b7280" }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default BetSlip;
