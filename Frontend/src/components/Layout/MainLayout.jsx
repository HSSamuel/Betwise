import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AIChatBot from "../ai/AIChatBot";
import { useAuth } from "../../hooks/useAuth";

const MainLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* THE FIX IS HERE: Render the AI Chat Bot only if a user is logged in */}
      {user && <AIChatBot />}

      <Footer />
    </div>
  );
};

export default MainLayout;
