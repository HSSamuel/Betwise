// src/context/BetSlipContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create the context
const BetSlipContext = createContext();

// Create a custom hook to easily use the context
export const useBetSlip = () => useContext(BetSlipContext);

// Create the Provider component
export const BetSlipProvider = ({ children }) => {
  const [selections, setSelections] = useState([]);

  // Function to add a new selection
  const addSelection = (newSelection) => {
    // Prevent adding the same game twice
    setSelections((prev) => {
      if (prev.find((s) => s.game._id === newSelection.game._id)) {
        return prev; // Do nothing if game is already in slip
      }
      return [...prev, newSelection];
    });
  };

  // Function to remove a selection
  const removeSelection = (gameId) => {
    setSelections((prev) => prev.filter((s) => s.game._id !== gameId));
  };

  // Function to clear the entire slip
  const clearBetSlip = () => {
    setSelections([]);
  };

  const value = {
    selections,
    addSelection,
    removeSelection,
    clearBetSlip,
  };

  return (
    <BetSlipContext.Provider value={value}>{children}</BetSlipContext.Provider>
  );
};
