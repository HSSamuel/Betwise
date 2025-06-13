// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BetSlipProvider } from "./context/BetSlipContext"; // <-- IMPORT

function App() {
  return (
    <BetSlipProvider>
      {" "}
      {/* <-- WRAP WITH PROVIDER */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </Router>
    </BetSlipProvider>
  );
}

export default App;
