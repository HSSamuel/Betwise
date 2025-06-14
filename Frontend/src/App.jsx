// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute"; // <-- IMPORT
import AdminDashboardPage from "./pages/AdminDashboardPage"; // <-- IMPORT
import { BetSlipProvider } from "./context/BetSlipContext";
import { AuthProvider } from "./context/AuthContext"; 
import AdminGamesPage from './pages/AdminGamesPage'; // <-- IMPORT ADMIN GAMES PAGE
import AdminLayout from './components/AdminLayout'; // <-- IMPORT ADMIN LAYOUT

function App() {
  return (
    <AuthProvider>
      <BetSlipProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="/" element={<AdminDashboardPage />} />
                        <Route path="/games" element={<AdminGamesPage />} />
                        {/* We will add more admin routes here */}
                      </Routes>
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              {/* ---------------------------------- */}
            </Routes>
          </Layout>
        </Router>
      </BetSlipProvider>
    </AuthProvider>
  );
}

export default App;
