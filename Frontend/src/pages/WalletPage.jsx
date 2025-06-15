import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getWalletData,
  getTransactions,
  initializeDeposit,
} from "../api/walletService";
import Spinner from "../components/shared/Spinner";
import toast from "react-hot-toast";

const WalletPage = () => {
  const { token, user } = useAuth();
  const [wallet, setWallet] = useState(user);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const [walletData, transData] = await Promise.all([
            getWalletData(token),
            getTransactions(token),
          ]);
          setWallet(walletData);
          setTransactions(transData.transactions);
        } catch (err) {
          toast.error(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [token]);

  const handleDeposit = async (e) => {
    e.preventDefault();
    toast.promise(initializeDeposit(depositAmount, token), {
      loading: "Redirecting to payment gateway...",
      success: (data) => {
        window.location.href = data.paymentLink;
        return "Redirecting...";
      },
      error: (err) => <b>{err.message}</b>,
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="wallet-page">
      <h1>My Wallet</h1>
      <h2>Balance: ₦{wallet?.walletBalance.toFixed(2)}</h2>

      <div className="deposit-section">
        <h3>Make a Deposit</h3>
        <form onSubmit={handleDeposit}>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            min="100"
          />
          <button type="submit">Deposit</button>
        </form>
      </div>

      <h3>Transaction History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
              <td>{tx.type}</td>
              <td style={{ color: tx.amount > 0 ? "green" : "red" }}>
                ₦{tx.amount.toFixed(2)}
              </td>
              <td>{tx.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletPage;
