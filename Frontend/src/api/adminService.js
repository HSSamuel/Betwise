const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const getPlatformStats = async (token) => {
  const response = await fetch(`${API_URL}/admin/stats/platform`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch platform stats.");
  return response.json();
};

export const getAllUsers = async (token) => {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch users.");
  return response.json();
};

export const getFinancialDashboard = async (token) => {
  const response = await fetch(`${API_URL}/admin/dashboard/financial`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch financial data.");
  return response.json();
};

export const getWithdrawalRequests = async (token) => {
  const response = await fetch(`${API_URL}/admin/withdrawals?status=pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch withdrawal requests.");
  return response.json();
};

export const processWithdrawal = async (withdrawalId, status, token) => {
  const response = await fetch(
    `${API_URL}/admin/withdrawals/${withdrawalId}/process`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.msg || "Failed to process withdrawal.");
  return data;
};

export const adjustUserWallet = async (userId, amount, description, token) => {
  const response = await fetch(`${API_URL}/admin/users/${userId}/wallet`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount, description }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || "Failed to adjust wallet.");
  return data;
};

export const updateUserRole = async (userId, role, token) => {
  const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || "Failed to update role.");
  return data;
};
