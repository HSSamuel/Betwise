import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { getGames } from "../../services/gameService";
import { getGameRiskAnalysis } from "../../services/adminService";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import { formatCurrency } from "../../utils/helpers";
import { formatDate } from "../../utils/formatDate"; // Added missing import

const RiskAnalysisDetails = ({ gameId }) => {
  const {
    data,
    loading,
    error,
    request: fetchRisk,
  } = useApi(getGameRiskAnalysis);

  useEffect(() => {
    if (gameId) {
      fetchRisk(gameId);
    }
  }, [gameId, fetchRisk]);

  if (!gameId)
    return (
      <p className="text-center text-gray-500">
        Select a game to see its risk analysis.
      </p>
    );
  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  const { analysis } = data;

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">Risk Details</h3>
      <p className="mb-4">
        <span className="font-semibold">
          Total Exposure (Potential Payout):
        </span>{" "}
        <span className="font-bold text-red-600">
          {formatCurrency(analysis.totalExposure)}
        </span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(analysis.outcomes).map(([outcome, details]) => (
          <div
            key={outcome}
            className="p-4 border rounded-lg dark:border-gray-600"
          >
            <h4 className="font-bold text-lg">
              {outcome === "A"
                ? "Home Win"
                : outcome === "B"
                ? "Away Win"
                : "Draw"}
            </h4>
            <p>
              Total Bets:{" "}
              <span className="font-semibold">{details.betCount}</span>
            </p>
            <p>
              Total Staked:{" "}
              <span className="font-semibold">
                {formatCurrency(details.totalStake)}
              </span>
            </p>
            <p>
              Potential Payout:{" "}
              <span className="font-semibold">
                {formatCurrency(details.totalPotentialPayout)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const AdminRiskPage = () => {
  const { data: gamesData, loading, request: fetchGames } = useApi(getGames);
  const [selectedGameId, setSelectedGameId] = useState("");

  useEffect(() => {
    // THE FIX IS HERE: Changed limit from 500 to 100
    fetchGames({ status: "upcoming", limit: 100 });
  }, [fetchGames]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Platform Risk Management</h1>
      <Card className="mb-6">
        <label htmlFor="game-select" className="block mb-2 font-medium">
          Select an Upcoming Game
        </label>
        <select
          id="game-select"
          value={selectedGameId}
          onChange={(e) => setSelectedGameId(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          disabled={loading}
        >
          <option value="" disabled>
            -- {loading ? "Loading games..." : "Select a game"} --
          </option>
          {gamesData?.games.map((game) => (
            <option key={game._id} value={game._id}>
              {game.homeTeam} vs {game.awayTeam} ({formatDate(game.matchDate)})
            </option>
          ))}
        </select>
      </Card>

      <RiskAnalysisDetails gameId={selectedGameId} />
    </div>
  );
};

export default AdminRiskPage;
