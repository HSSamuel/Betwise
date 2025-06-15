import React from "react";
import { useBetSlip } from "../contexts/BetSlipContext";

const GameCard = ({ game }) => {
  const { addSelection, selections } = useBetSlip();

  const getButtonClass = (outcome) => {
    const currentSelection = selections.find((s) => s.gameId === game._id);
    return currentSelection && currentSelection.outcome === outcome
      ? "active"
      : "";
  };

  const handleBetClick = (outcome, odds) => {
    const selection = {
      gameId: game._id,
      gameDetails: { homeTeam: game.homeTeam, awayTeam: game.awayTeam },
      teamToBetOn:
        outcome === "A"
          ? game.awayTeam
          : outcome === "H"
          ? game.homeTeam
          : "Draw",
      outcome,
      odds,
    };
    addSelection(selection);
  };

  return (
    <div className="game-card">
      <div className="game-card-teams">
        <span>{game.homeTeam}</span>
        <span>vs</span>
        <span>{game.awayTeam}</span>
      </div>
      <div className="game-card-details">
        <p>
          {game.league} -{" "}
          {new Date(game.matchDate).toLocaleString("en-NG", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>
      <div className="odds-buttons">
        <button
          className={getButtonClass("H")}
          onClick={() => handleBetClick("H", game.odds.home)}
        >
          1 - {game.odds.home.toFixed(2)}
        </button>
        <button
          className={getButtonClass("D")}
          onClick={() => handleBetClick("D", game.odds.draw)}
        >
          X - {game.odds.draw.toFixed(2)}
        </button>
        <button
          className={getButtonClass("A")}
          onClick={() => handleBetClick("A", game.odds.away)}
        >
          2 - {game.odds.away.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default GameCard;
