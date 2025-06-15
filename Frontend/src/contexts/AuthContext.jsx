import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { fetchUserProfile } from "../api/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const verifyUser = useCallback(async () => {
    if (token) {
      try {
        const profile = await fetchUserProfile(token);
        setUser(profile);
      } catch (error) {
        console.error("Token verification failed:", error);
        logout();
      }
    }
    setIsAuthLoading(false);
  }, [token]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const login = (userData, accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isLoggedIn: !!user,
    isAuthLoading,
    login,
    logout,
    verifyUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
