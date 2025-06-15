const WALLET_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const getWalletData = async (token) => {
  const response = await fetch(`${WALLET_API_URL}/wallet`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch wallet data.");
  return response.json();
};

export const getTransactions = async (token) => {
  const response = await fetch(`${WALLET_API_URL}/wallet/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch transactions.");
  return response.json();
};

export const initializeDeposit = async (amount, token) => {
  const response = await fetch(`${WALLET_API_URL}/wallet/deposit/initialize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.errors ? data.errors[0].msg : "Failed to initialize deposit."
    );
  return data;
};
