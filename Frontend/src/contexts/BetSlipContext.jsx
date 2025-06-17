import React, { createContext, useState, useContext, useMemo } from "react";
import toast from "react-hot-toast";

const BetSlipContext = createContext();

export const BetSlipProvider = ({ children }) => {
  const [selections, setSelections] = useState([]);

  // --- REFACTORED AND CORRECTED addSelection FUNCTION ---
  const addSelection = (selection) => {
    let toastMessage = "";
    let newSelections = [];

    const prevSelections = [...selections];
    const existingIndex = prevSelections.findIndex(
      (s) => s.gameId === selection.gameId
    );

    if (existingIndex > -1) {
      // If the same outcome is clicked again, remove it (deselect)
      if (prevSelections[existingIndex].outcome === selection.outcome) {
        newSelections = prevSelections.filter(
          (s) => s.gameId !== selection.gameId
        );
        // No toast message on deselect for a cleaner experience
      } else {
        // If a different outcome for the same game is selected, replace it
        newSelections = [...prevSelections];
        newSelections[existingIndex] = selection;
        toastMessage = "Selection updated in your bet slip!";
      }
    } else {
      // If it's a new game, add it to the slip
      if (prevSelections.length >= 10) {
        toast.error(
          "You can only have a maximum of 10 selections in a multi-bet."
        );
        newSelections = prevSelections; // State doesn't change
      } else {
        newSelections = [...prevSelections, selection];
        toastMessage = "Selection added to your bet slip!";
      }
    }

    // Perform the state update and side-effect separately
    setSelections(newSelections);
    if (toastMessage) {
      toast.success(toastMessage);
    }
  };

  const removeSelection = (gameId) => {
    setSelections((prev) => prev.filter((s) => s.gameId !== gameId));
  };

  const clearSelections = () => {
    setSelections([]);
  };

  const totalOdds = useMemo(() => {
    if (selections.length === 0) return 0;
    // Safely calculate total odds
    return selections.reduce((acc, current) => {
      const odds = parseFloat(current.odds);
      return !isNaN(odds) ? acc * odds : acc;
    }, 1);
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
