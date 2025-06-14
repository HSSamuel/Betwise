// src/pages/AdminGamesPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminGamesPage = () => {
  const { token } = useAuth();
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    homeTeam: "",
    awayTeam: "",
    league: "",
    matchDate: "",
    "odds.home": "2.00",
    "odds.away": "2.00",
    "odds.draw": "3.00",
  });

  const fetchGames = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/games`);
      setGames(res.data.games);
    } catch (error) {
      console.error("Failed to fetch games", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreateGame = async (e) => {
    e.preventDefault();
    const payload = {
      homeTeam: form.homeTeam,
      awayTeam: form.awayTeam,
      league: form.league,
      matchDate: form.matchDate,
      odds: {
        home: parseFloat(form["odds.home"]),
        away: parseFloat(form["odds.away"]),
        draw: parseFloat(form["odds.draw"]),
      },
    };

    try {
      await axios.post(`${API_BASE_URL}/games`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Game created successfully!");
      fetchGames(); // Refresh the list of games
    } catch (error) {
      alert(
        "Failed to create game. " + (error.response?.data?.errors[0]?.msg || "")
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Create New Game</h3>
        <form
          onSubmit={handleCreateGame}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="homeTeam"
            onChange={handleChange}
            placeholder="Home Team"
            required
            className="p-2 border rounded"
          />
          <input
            name="awayTeam"
            onChange={handleChange}
            placeholder="Away Team"
            required
            className="p-2 border rounded"
          />
          <input
            name="league"
            onChange={handleChange}
            placeholder="League"
            required
            className="p-2 border rounded"
          />
          <input
            name="matchDate"
            type="datetime-local"
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="odds.home"
            type="number"
            step="0.01"
            onChange={handleChange}
            value={form["odds.home"]}
            placeholder="Home Odds"
            required
            className="p-2 border rounded"
          />
          <input
            name="odds.away"
            type="number"
            step="0.01"
            onChange={handleChange}
            value={form["odds.away"]}
            placeholder="Away Odds"
            required
            className="p-2 border rounded"
          />
          <input
            name="odds.draw"
            type="number"
            step="0.01"
            onChange={handleChange}
            value={form["odds.draw"]}
            placeholder="Draw Odds"
            required
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Create Game
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Existing Games</h3>
        {/* We will build the game management table here later */}
        <ul>
          {games.map((game) => (
            <li key={game._id}>
              {game.homeTeam} vs {game.awayTeam} ({game.status})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminGamesPage;
