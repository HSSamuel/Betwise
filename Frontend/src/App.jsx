// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// --- Context Providers ---
import { AuthProvider } from "./contexts/AuthContext";
import { BetSlipProvider } from "./contexts/BetSlipContext";

// --- Layout Components ---
import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout"; // Import the main layout wrapper

// --- Route-Guarding Components ---
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// --- Page Components ---
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyBetsPage from "./pages/MyBetsPage";
import WalletPage from "./pages/WalletPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFoundPage from "./pages/NotFoundPage"; // A fallback page for wrong URLs

/**
 * The main App component that orchestrates the entire frontend application.
 * It sets up routing and provides global state to all child components.
 */
const App = () => {
  return (
    // The Router is the top-level component that enables client-side routing.
    <Router>
      {/* AuthProvider makes user data and login/logout functions available globally. */}
      <AuthProvider>
        {/* BetSlipProvider makes the bet slip state and functions available globally. */}
        <BetSlipProvider>
          {/* Toaster is the component from react-hot-toast that renders notifications. */}
          <Toaster position="top-center" reverseOrder={false} />

          {/* This wrapper ensures the footer sticks to the bottom on short pages. */}
          <div className="app-wrapper">
            <Header />

            {/* The Layout component provides consistent padding and max-width for all pages. */}
            <Layout>
              {/* The Routes component defines all the possible pages in the application. */}
              <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* --- User Protected Routes (Must be logged in) --- */}
                <Route
                  path="/my-bets"
                  element={
                    <ProtectedRoute>
                      <MyBetsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wallet"
                  element={
                    <ProtectedRoute>
                      <WalletPage />
                    </ProtectedRoute>
                  }
                />

                {/* --- Admin Protected Route (Must be logged in and have 'admin' role) --- */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />

                {/* --- Fallback Route for any other URL --- */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>

            <Footer />
          </div>
        </BetSlipProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
