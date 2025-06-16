import React, { useEffect, useState } from "react";
import {
  getGames,
  getPersonalizedFeed,
  getGameSuggestions,
} from "../../services/gameService";
import { useApi } from "../../hooks/useApi";
import GameList from "../../components/games/GameList";
import BetSlip from "../../components/bets/BetSlip";
import GameCardSkeleton from "../../components/games/GameCardSkeleton"; // <-- Import the skeleton
import { useAuth } from "../../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  const {
    data: gamesData,
    loading: upcomingLoading,
    error,
    request: fetchGames,
  } = useApi(getGames);
  const {
    data: feedData,
    loading: feedLoading,
    request: fetchFeed,
  } = useApi(getPersonalizedFeed);
  const {
    data: suggestionsData,
    loading: suggestionsLoading,
    request: fetchSuggestions,
  } = useApi(getGameSuggestions);

  const [activeTab, setActiveTab] = useState("upcoming");

  // Determine the overall loading state
  const isLoading = upcomingLoading || feedLoading || suggestionsLoading;

  useEffect(() => {
    if (user) {
      fetchFeed();
      fetchSuggestions();
      setActiveTab("feed");
    } else {
      fetchGames({ status: "upcoming", limit: 20 });
    }
  }, [user, fetchGames, fetchFeed, fetchSuggestions]);

  const renderContent = () => {
    // Show skeletons while loading
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <GameCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500 text-center">{error}</p>;
    }

    switch (activeTab) {
      case "feed":
        return <GameList games={feedData?.games || []} />;
      case "suggestions":
        return <GameList games={suggestionsData?.suggestions || []} />;
      case "upcoming":
      default:
        return <GameList games={gamesData?.games || []} />;
    }
  };

  const tabClass = (tabName) =>
    `px-4 py-2 font-semibold rounded-t-lg ${
      activeTab === tabName
        ? "bg-white dark:bg-gray-800 border-b-0 border-l border-t border-r dark:border-gray-700"
        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
    }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {user ? (
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("feed")}
              className={tabClass("feed")}
            >
              For You
            </button>
            <button
              onClick={() => setActiveTab("suggestions")}
              className={tabClass("suggestions")}
            >
              Suggestions
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={tabClass("upcoming")}
            >
              All Upcoming
            </button>
          </div>
        ) : (
          <h1 className="text-3xl font-bold mb-4">Upcoming Games</h1>
        )}
        {renderContent()}
      </div>
      <div className="lg:col-span-1">
        <div className="sticky top-5">
          <BetSlip />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
