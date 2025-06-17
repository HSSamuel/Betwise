import React from "react";
import GameCard from "./GameCard";

const GameList = ({ games }) => {
  console.log("Games received in GameList:", JSON.stringify(games, null, 2));
  if (!games || games.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No games available at the moment.
      </p>
    );
  }

  // --- THIS IS THE CRUCIAL FIX ---
  // This regex ensures that the _id is a valid 24-character hex string,
  // matching the backend's validation requirements.
  const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
  const validGames = games.filter(
    (game) => game && game._id && mongoIdRegex.test(game._id)
  );

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
