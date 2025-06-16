import React, { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { getProfile } from "../../services/userService";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import { FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const ProfilePage = () => {
  const {
    data: profile,
    loading,
    error,
    request: fetchProfile,
  } = useApi(getProfile);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      {profile && (
        <Card>
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-green-100 rounded-full">
              <FaUser className="text-green-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-500">@{profile.username}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <FaEnvelope className="text-gray-400 mr-3" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-gray-400 mr-3" />
              <span>
                Joined on: {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Betting Limits</h3>
              <p>
                Weekly Bet Count Limit:{" "}
                {profile.limits.weeklyBetCount.limit > 0
                  ? profile.limits.weeklyBetCount.limit
                  : "Not set"}
              </p>
              <p>
                Weekly Stake Limit:{" "}
                {profile.limits.weeklyStakeAmount.limit > 0
                  ? `$${profile.limits.weeklyStakeAmount.limit}`
                  : "Not set"}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
