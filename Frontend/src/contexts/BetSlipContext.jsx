import React, { createContext, useState, useContext, useMemo } from "react";
import toast from "react-hot-toast";

const BetSlipContext = createContext();

export const BetSlipProvider = ({ children }) => {
  const [selections, setSelections] = useState([]);

  const addSelection = (selection) => {
    setSelections((prev) => {
      // If the same game is selected, replace the outcome
      const existingIndex = prev.findIndex(
        (s) => s.gameId === selection.gameId
      );
      if (existingIndex > -1) {
        // If the same outcome is clicked again, remove it
        if (prev[existingIndex].outcome === selection.outcome) {
          return prev.filter((s) => s.gameId !== selection.gameId);
        }
        const updatedSelections = [...prev];
        updatedSelections[existingIndex] = selection;
        toast.success("Selection updated in your bet slip!");
        return updatedSelections;
      }
      // If it's a new game, add it to the slip
      if (prev.length >= 10) {
        toast.error(
          "You can only have a maximum of 10 selections in a multi-bet."
        );
        return prev;
      }
      toast.success("Selection added to your bet slip!");
      return [...prev, selection];
    });
  };

  const removeSelection = (gameId) => {
    setSelections((prev) => prev.filter((s) => s.gameId !== gameId));
  };

  const clearSelections = () => {
    setSelections([]);
  };

  const totalOdds = useMemo(() => {
    if (selections.length === 0) return 0;
    return selections.reduce((acc, current) => acc * current.odds, 1);
  }, [selections]);

  const value = {
    selections,
    addSelection,
    removeSelection,
    clearSelections,
    totalOdds,
  };

  return (
    <BetSlipContext.Provider value={value}>{children}</BetSlipContext.Provider>
  );
};

export const useBetSlip = () => useContext(BetSlipContext);
