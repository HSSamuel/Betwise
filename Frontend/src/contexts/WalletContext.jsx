import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { getWallet } from "../services/walletService";
import { useAuth } from "../hooks/useAuth"; // This path is now corrected

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const { user } = useAuth();

  const fetchWalletBalance = useCallback(async () => {
    if (!user) {
      setBalance(0);
      return;
    }
    try {
      const walletData = await getWallet();
      setBalance(walletData.walletBalance);
    } catch (error) {
      console.error("Failed to fetch wallet balance", error);
      setBalance(0);
    }
  }, [user]);

  useEffect(() => {
    fetchWalletBalance();
  }, [fetchWalletBalance]);

  const value = { balance, fetchWalletBalance };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export default WalletContext;
