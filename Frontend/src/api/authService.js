const AUTH_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const loginUser = async (credentials) => {
  const response = await fetch(`${AUTH_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || "Login failed");
  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${AUTH_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || "Registration failed");
  return data;
};

export const fetchUserProfile = async (token) => {
  const response = await fetch(`${AUTH_API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch profile.");
  return response.json();
};
