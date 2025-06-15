import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserBets } from "../api/betService";
import Spinner from "../components/shared/Spinner";

const MyBetsPage = () => {
  const { token } = useAuth();
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBets = async () => {
      if (token) {
        try {
          const data = await getUserBets(token);
          setBets(data.bets);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchBets();
  }, [token]);

  if (isLoading) return <Spinner />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1>My Bets</h1>
      {bets.length === 0 ? (
        <p>You have not placed any bets yet.</p>
      ) : (
        <div className="bets-list">
          {bets.map((bet) => (
            <div key={bet._id} className={`bet-card ${bet.status}`}>
              <div className="bet-card-header">
                <span>
                  Status: <strong>{bet.status.toUpperCase()}</strong>
                </span>
                <span>{new Date(bet.createdAt).toLocaleString()}</span>
              </div>
              <div className="bet-card-body">
                {bet.selections.map((selection, index) => (
                  <div key={index} className="bet-selection">
                    <p>
                      {selection.game?.homeTeam} vs {selection.game?.awayTeam}
                    </p>
                    <p>
                      Your Pick:{" "}
                      <strong>
                        {selection.outcome === "A"
                          ? selection.game?.homeTeam
                          : selection.outcome === "B"
                          ? selection.game?.awayTeam
                          : "Draw"}
                      </strong>
                    </p>
                    <p>Odds: {selection.odds.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="bet-card-footer">
                <p>Stake: ₦{bet.stake.toFixed(2)}</p>
                <p>Total Odds: {bet.totalOdds.toFixed(2)}x</p>
                {bet.status === "won" ? (
                  <p className="payout-amount">Won: ₦{bet.payout.toFixed(2)}</p>
                ) : (
                  <p>
                    Potential Payout: ₦{(bet.stake * bet.totalOdds).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBetsPage;
