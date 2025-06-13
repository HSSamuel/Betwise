// src/components/GameFixture.jsx
import React from "react";
import { useBetSlip } from "../context/BetSlipContext"; // <-- IMPORT

const GameFixture = ({ game }) => {
  const { addSelection } = useBetSlip(); // <-- USE THE CONTEXT

  const handleBetClick = (outcome, odds, description) => {
    const selection = {
      game: game,
      outcome: outcome,
      odds: odds,
      outcomeDescription: `${description} @ ${odds.toFixed(2)}`,
    };
    addSelection(selection);
  };

  const matchTime = new Date(game.matchDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-2 mb-3">
      <div className="flex-1 flex items-center space-x-2">
        <img
          src={game.homeTeamLogo}
          alt={game.homeTeam}
          className="h-6 w-6 object-contain"
        />
        <span className="font-semibold text-sm text-gray-800">
          {game.homeTeam}
        </span>
      </div>
      <div className="flex items-center space-x-3 text-center">
        <div className="text-xs text-gray-500 font-bold">{matchTime}</div>
        {/* UPDATE BUTTONS WITH ONCLICK HANDLERS */}
        <button
          onClick={() => handleBetClick("A", game.odds.home, game.homeTeam)}
          className="bg-gray-200 hover:bg-green-200 px-3 py-1 text-xs font-bold rounded"
        >
          {game.odds.home.toFixed(2)}
        </button>
        <button
          onClick={() => handleBetClick("Draw", game.odds.draw, "Draw")}
          className="bg-gray-200 hover:bg-green-200 px-3 py-1 text-xs font-bold rounded"
        >
          {game.odds.draw.toFixed(2)}
        </button>
        <button
          onClick={() => handleBetClick("B", game.odds.away, game.awayTeam)}
          className="bg-gray-200 hover:bg-green-200 px-3 py-1 text-xs font-bold rounded"
        >
          {game.odds.away.toFixed(2)}
        </button>
      </div>
      <div className="flex-1 flex items-center justify-end space-x-2">
        <span className="font-semibold text-sm text-gray-800 text-right">
          {game.awayTeam}
        </span>
        <img
          src={game.awayTeamLogo}
          alt={game.awayTeam}
          className="h-6 w-6 object-contain"
        />
      </div>
    </div>
  );
};

export default GameFixture;
