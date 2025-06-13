// src/components/Layout.jsx
import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import BetSlip from "./BetSlip"; // <-- IMPORT

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto flex-grow p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <main className="w-full md:w-2/3">{children}</main>
          <aside className="w-full md:w-1/3">
            <BetSlip /> {/* <-- ADD BETSLIP COMPONENT HERE */}
          </aside>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Layout;
