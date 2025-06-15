import React, { useState, useEffect } from "react";
import { getUpcomingGames } from "../api/gameService";
import GameCard from "../components/GameCard";
import BetSlip from "../components/BetSlip";
import Spinner from "../components/shared/Spinner";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getUpcomingGames();
        setGames(data.games);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  const renderGamesList = () => {
    if (isLoading) return <Spinner />;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (games.length === 0) return <p>No upcoming games available.</p>;
    return games.map((game) => <GameCard key={game._id} game={game} />);
  };

  return (
    <div className="app-container">
      <div className="games-list">
        <h1>Upcoming Games</h1>
        {renderGamesList()}
      </div>
      <aside className="sidebar">
        <BetSlip />
      </aside>
    </div>
  );
};

export default HomePage;
