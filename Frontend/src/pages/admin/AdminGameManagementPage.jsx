import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { getGames, cancelGame } from "../../services/gameService"; // Corrected import path
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";
import CreateGameModal from "../../components/admin/CreateGameModal";
import SetResultModal from "../../components/admin/SetResultModal";

const AdminGameManagementPage = () => {
  const { data, loading, error, request: fetchGames } = useApi(getGames);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isResultModalOpen, setResultModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetchGames({ limit: 100, sortBy: "matchDate", order: "desc" });
  }, [fetchGames]);

  const refetchGames = () =>
    fetchGames({ limit: 100, sortBy: "matchDate", order: "desc" });

  const handleCancelGame = async (gameId) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this game? All pending bets will be refunded."
      )
    ) {
      try {
        await cancelGame(gameId);
        toast.success("Game cancelled successfully.");
        refetchGames();
      } catch (err) {
        toast.error(err.response?.data?.msg || "Failed to cancel game.");
      }
    }
  };

  const openResultModal = (game) => {
    setSelectedGame(game);
    setResultModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Game Management</h1>
        <Button onClick={() => setCreateModalOpen(true)}>Create Game</Button>
      </div>

      <CreateGameModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onGameCreated={refetchGames}
      />
      <SetResultModal
        isOpen={isResultModalOpen}
        onClose={() => setResultModalOpen(false)}
        onResultSubmitted={refetchGames}
        game={selectedGame}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Match
              </th>
              <th scope="col" className="px-6 py-3">
                League
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Result
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  <Spinner />
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {data?.games.map((game) => (
              <tr key={game._id} className="bg-white border-b">
                <td className="px-6 py-4 font-medium">
                  {game.homeTeam} vs {game.awayTeam}
                </td>
                <td className="px-6 py-4">{game.league}</td>
                <td className="px-6 py-4">{formatDate(game.matchDate)}</td>
                <td className="px-6 py-4">{game.status}</td>
                <td className="px-6 py-4">{game.result || "N/A"}</td>
                <td className="px-6 py-4 space-x-2">
                  {game.status === "upcoming" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openResultModal(game)}
                      >
                        Set Result
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleCancelGame(game._id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGameManagementPage;
