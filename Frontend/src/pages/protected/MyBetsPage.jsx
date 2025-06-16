import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { getUserBets } from "../../services/betService";
import Spinner from "../../components/ui/Spinner";
import Pagination from "../../components/ui/Pagination"; // <-- Import Pagination
import { FaTicketAlt } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/helpers";
import { capitalize } from "../../utils/helpers";

const BetRow = ({ bet }) => {
  const isWin = bet.status === "won";
  const isLoss = bet.status === "lost";

  let statusClass =
    "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
  if (isWin)
    statusClass =
      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
  if (isLoss)
    statusClass = "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";

  const betDetails = bet.selections.map((sel) => {
    if (!sel.game) {
      return (
        <div key={sel._id || Math.random()} className="text-red-500">
          <span>Game data is unavailable</span>
        </div>
      );
    }
    return (
      <div key={sel.game._id}>
        <span>
          {sel.game.homeTeam} vs {sel.game.awayTeam}
        </span>
        <span className="font-semibold ml-2">({capitalize(sel.outcome)})</span>
      </div>
    );
  });

  return (
    <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">{capitalize(bet.betType)}</td>
      <td className="px-6 py-4">{betDetails}</td>
      <td className="px-6 py-4">{formatCurrency(bet.stake)}</td>
      <td className="px-6 py-4">{bet.totalOdds.toFixed(2)}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}
        >
          {capitalize(bet.status)}
        </span>
      </td>
      <td className="px-6 py-4 font-semibold">{formatCurrency(bet.payout)}</td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {formatDate(bet.createdAt)}
      </td>
    </tr>
  );
};

const MyBetsPage = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // <-- Add state for current page
  const { data, loading, error, request: fetchBets } = useApi(getUserBets);

  useEffect(() => {
    const params = { page: currentPage, limit: 10 }; // <-- Add page and limit to params
    if (statusFilter) {
      params.status = statusFilter;
    }
    fetchBets(params);
  }, [statusFilter, currentPage, fetchBets]); // <-- Add currentPage to dependency array

  // Reset to page 1 whenever the filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <FaTicketAlt className="mr-3" /> My Bets
        </h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
              <th scope="col" className="px-6 py-3">
                Stake
              </th>
              <th scope="col" className="px-6 py-3">
                Odds
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Payout
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  <Spinner />
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {data?.bets.map((bet) => (
              <BetRow key={bet._id} bet={bet} />
            ))}
            {!loading && data?.bets.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No bets found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render the Pagination component */}
      <Pagination
        currentPage={data?.currentPage || 1}
        totalPages={data?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default MyBetsPage;
