const GAME_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const getUpcomingGames = async () => {
  const response = await fetch(
    `${GAME_API_URL}/games?status=upcoming&limit=50`
  );
  if (!response.ok)
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  return response.json();
};
