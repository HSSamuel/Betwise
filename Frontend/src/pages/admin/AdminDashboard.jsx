import React, { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import {
  getPlatformStats,
  getFinancialDashboard,
} from "../../services/adminService";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import {
  FaUsers,
  FaGamepad,
  FaFileInvoiceDollar,
  FaChartLine,
  FaDollarSign,
  FaPiggyBank,
} from "react-icons/fa";
import { formatCurrency } from "../../utils/helpers";

// A small sub-component to keep the dashboard code clean
const StatCard = ({ title, value, icon, color }) => (
  <Card>
    <div className="flex items-center">
      <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </Card>
);

const AdminDashboard = () => {
  const {
    data: stats,
    loading: statsLoading,
    request: fetchStats,
  } = useApi(getPlatformStats);
  const {
    data: financials,
    loading: financialsLoading,
    request: fetchFinancials,
  } = useApi(getFinancialDashboard);

  useEffect(() => {
    fetchStats();
    fetchFinancials();
  }, [fetchStats, fetchFinancials]);

  if (statsLoading || financialsLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers}
          icon={<FaUsers size={22} />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Total Bets"
          value={stats?.totalBets}
          icon={<FaFileInvoiceDollar size={22} />}
          color="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          title="Active Games"
          value={stats?.totalGames}
          icon={<FaGamepad size={22} />}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Upcoming Games"
          value={stats?.upcomingGames}
          icon={<FaChartLine size={22} />}
          color="bg-pink-100 text-pink-600"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Financial Snapshot</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Stakes"
          value={formatCurrency(financials?.totalStakes.amount)}
          icon={<FaDollarSign size={22} />}
          color="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          title="Total Payouts"
          value={formatCurrency(financials?.totalPayoutsToUsers.amount)}
          icon={<FaPiggyBank size={22} />}
          color="bg-red-100 text-red-600"
        />
        <StatCard
          title="Platform Revenue"
          value={formatCurrency(financials?.platformRevenue.amount)}
          icon={<FaDollarSign size={22} />}
          color="bg-green-100 text-green-600"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
