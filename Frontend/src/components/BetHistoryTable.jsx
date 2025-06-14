// src/components/BetHistoryTable.jsx
import React from "react";

const BetHistoryTable = ({ bets }) => {
  if (!bets || bets.length === 0) {
    return <p>You have not placed any bets yet.</p>;
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "won":
        return "bg-green-100 text-green-800";
      case "lost":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
              Date
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
              Selections
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
              Stake
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
              Payout
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bets.map((bet) => (
            <tr key={bet._id}>
              <td className="py-4 px-4 text-sm">
                {new Date(bet.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-4 text-sm">
                {bet.selections.map((s) => (
                  <div key={s.game._id}>
                    {s.game.homeTeam} vs {s.game.awayTeam}
                  </div>
                ))}
              </td>
              <td className="py-4 px-4 text-sm">NGN {bet.stake.toFixed(2)}</td>
              <td className="py-4 px-4 text-sm font-semibold">
                NGN {bet.payout.toFixed(2)}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                    bet.status
                  )}`}
                >
                  {bet.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BetHistoryTable;
