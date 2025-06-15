import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="app-footer">
      <p>
        &copy; {currentYear} BetWise. All Rights Reserved. Built in Nigeria.
      </p>
      <div className="footer-links">
        <a href="#terms">Terms of Service</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#contact">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
