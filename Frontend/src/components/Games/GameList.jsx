import React from "react";
import GameCard from "./GameCard";

const GameList = ({ games }) => {
  if (!games || games.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No games available at the moment.
      </p>
    );
  }

  // **THE FIX IS HERE:**
  // This line filters out any null or undefined game objects from the array
  // before we try to map over them. This prevents the entire page from crashing.
  const validGames = games.filter((game) => game && game._id);

  if (validGames.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No valid games to display.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {validGames.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
