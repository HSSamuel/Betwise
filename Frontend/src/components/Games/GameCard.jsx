import React from "react";
import { formatDate } from "../../utils/formatDate";
import OddsDisplay from "./OddsDisplay";

const GameCard = ({ game }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 transition-shadow hover:shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{game.league}</span>
        <span className="text-sm text-gray-500">
          {formatDate(game.matchDate)}
        </span>
      </div>
      <div className="flex items-center justify-around text-center my-4">
        <div className="flex-1 flex flex-col items-center">
          <img
            src={game.homeTeamLogo || "/default-logo.png"}
            alt={game.homeTeam}
            className="w-12 h-12 mb-2"
          />
          <span className="font-bold text-lg">{game.homeTeam}</span>
        </div>
        <div className="text-2xl font-bold text-gray-400 mx-4">vs</div>
        <div className="flex-1 flex flex-col items-center">
          <img
            src={game.awayTeamLogo || "/default-logo.png"}
            alt={game.awayTeam}
            className="w-12 h-12 mb-2"
          />
          <span className="font-bold text-lg">{game.awayTeam}</span>
        </div>
      </div>
      <OddsDisplay game={game} />
    </div>
  );
};

export default GameCard;
