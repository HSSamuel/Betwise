import React, { createContext, useState, useContext } from "react";

const BetSlipContext = createContext();

export const useBetSlip = () => useContext(BetSlipContext);

export const BetSlipProvider = ({ children }) => {
  const [selections, setSelections] = useState([]);

  const addSelection = (newSelection) => {
    setSelections((prev) => {
      const existingSelection = prev.find(
        (item) => item.gameId === newSelection.gameId
      );
      if (existingSelection) {
        if (existingSelection.outcome === newSelection.outcome) {
          // If same selection is clicked again, remove it
          return prev.filter((item) => item.gameId !== newSelection.gameId);
        }
        // If different outcome for same game, replace it
        return prev.map((item) =>
          item.gameId === newSelection.gameId ? newSelection : item
        );
      }
      // Add new selection
      return [...prev, newSelection];
    });
  };

  const removeSelection = (gameId) => {
    setSelections((prev) => prev.filter((item) => item.gameId !== gameId));
  };

  const clearSelections = () => {
    setSelections([]);
  };

  const value = { selections, addSelection, removeSelection, clearSelections };

  return (
    <BetSlipContext.Provider value={value}>{children}</BetSlipContext.Provider>
  );
};
