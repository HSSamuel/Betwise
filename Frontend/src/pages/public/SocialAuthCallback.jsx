import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const SocialAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleSocialAuth } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      handleSocialAuth(accessToken, refreshToken);
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error("Authentication failed. Please try again.");
      navigate("/login");
    }
  }, [searchParams, navigate, handleSocialAuth]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Spinner size="lg" />
      <p className="mt-4 text-lg text-gray-600">Finalizing your login...</p>
    </div>
  );
};

export default SocialAuthCallback;
