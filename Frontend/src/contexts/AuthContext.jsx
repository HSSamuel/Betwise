import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import * as authService from "../services/authService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initAuth = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        if (decoded.exp * 1000 > Date.now()) {
          // **THE FIX IS HERE: Use _id instead of id for consistency**
          setUser({
            _id: decoded.id,
            username: decoded.username,
            role: decoded.role,
          });
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        } else {
          logout();
        }
      } catch (error) {
        console.error("Invalid token on initial load", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (email, password) => {
    const {
      accessToken,
      refreshToken,
      user: userData,
    } = await authService.login(email, password);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setUser(userData);
  };

  const register = async (userData) => {
    const {
      accessToken,
      refreshToken,
      user: newUser,
    } = await authService.register(userData);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete api.defaults.headers.common["Authorization"];
  };

  const handleSocialAuth = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    try {
      const decoded = jwtDecode(accessToken);
      // **THE FIX IS HERE: Use _id instead of id for consistency**
      setUser({
        _id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      });
    } catch (error) {
      console.error("Error decoding social auth token:", error);
      logout();
    }
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    register,
    loading,
    handleSocialAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
