const BET_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const placeMultiBet = async (betData, token) => {
  const response = await fetch(`${BET_API_URL}/bets/multi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(betData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || "Failed to place bet.");
  return data;
};

export const getUserBets = async (token) => {
  const response = await fetch(`${BET_API_URL}/bets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch user bets.");
  return response.json();
};
