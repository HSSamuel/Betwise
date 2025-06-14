// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import GameFixture from "../components/GameFixture";

// Use the VITE_API_URL from your .env file to get the correct backend address
const API_URL = `${import.meta.env.VITE_API_URL}/games?status=upcoming`;

const HomePage = () => {
  // State to hold the list of games
  const [games, setGames] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle any errors
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component loads
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        // Ensure you are accessing the nested 'games' array from your API response
        setGames(response.data.games);
        setError(null);
      } catch (err) {
        setError("Failed to fetch games. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // The empty array [] means this effect runs only once

  if (loading) {
    return <div className="text-center p-10">Loading games...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Games</h2>
      {games.length > 0 ? (
        games.map((game) => <GameFixture key={game._id} game={game} />)
      ) : (
        <p>No upcoming games available at the moment.</p>
      )}
    </div>
  );
};

export default HomePage;
