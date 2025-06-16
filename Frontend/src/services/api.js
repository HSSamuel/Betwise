import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
});

// Request Interceptor: Attaches the JWT token to every outgoing request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles token refreshing.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and we haven't retried yet.
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // Check if refresh token is also expired
          const decodedRefresh = jwtDecode(refreshToken);
          if (decodedRefresh.exp * 1000 < Date.now()) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login"; // Redirect to login
            return Promise.reject(error);
          }

          // Attempt to get a new access token
          const { data } = await api.post("/auth/refresh-token", {
            token: refreshToken,
          });

          localStorage.setItem("accessToken", data.accessToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;

          // Retry the original request with the new token
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear tokens and redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
