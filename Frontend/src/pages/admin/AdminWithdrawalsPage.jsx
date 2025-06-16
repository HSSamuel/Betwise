import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import {
  adminGetWithdrawals,
  adminProcessWithdrawal,
} from "../../services/adminService";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/helpers";

const AdminWithdrawalsPage = () => {
  const [statusFilter, setStatusFilter] = useState("pending");
  const {
    data: withdrawals,
    loading,
    error,
    request: fetchWithdrawals,
  } = useApi(adminGetWithdrawals);

  useEffect(() => {
    fetchWithdrawals(statusFilter);
  }, [statusFilter, fetchWithdrawals]);

  const handleProcess = async (id, newStatus) => {
    if (
      window.confirm(`Are you sure you want to ${newStatus} this withdrawal?`)
    ) {
      try {
        await adminProcessWithdrawal(
          id,
          newStatus,
          `Request ${newStatus} by admin.`
        );
        toast.success(`Withdrawal ${newStatus}.`);
        fetchWithdrawals(statusFilter);
      } catch (err) {
        toast.error(err.response?.data?.msg || "Action failed.");
      }
    }
  };

  const tabClass = (tabName) =>
    `px-4 py-2 font-semibold ${
      statusFilter === tabName
        ? "text-green-600 border-b-2 border-green-600"
        : "text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Withdrawal Requests</h1>

      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setStatusFilter("pending")}
            className={tabClass("pending")}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter("approved")}
            className={tabClass("approved")}
          >
            Approved
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className={tabClass("rejected")}
          >
            Rejected
          </button>
        </nav>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                User Balance
              </th>
              <th scope="col" className="px-6 py-3">
                Date Requested
              </th>
              {statusFilter === "pending" && (
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  <Spinner />
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {withdrawals?.map((w) => (
              <tr key={w._id} className="bg-white border-b">
                <td className="px-6 py-4 font-medium">
                  {w.user?.username} ({w.user?.email})
                </td>
                <td className="px-6 py-4 font-bold text-red-600">
                  {formatCurrency(w.amount)}
                </td>
                <td className="px-6 py-4">
                  {formatCurrency(w.user?.walletBalance)}
                </td>
                <td className="px-6 py-4">{formatDate(w.createdAt)}</td>
                {statusFilter === "pending" && (
                  <td className="px-6 py-4 space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleProcess(w._id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleProcess(w._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </td>
                )}
              </tr>
            ))}
            {!loading && withdrawals?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No {statusFilter} withdrawals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWithdrawalsPage;
