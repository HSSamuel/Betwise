// src/components/icons/FootballIcon.jsx
import React from "react";

const FootballIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 5.29-5.29-2.12 2.12-5.29 5.29 2.12z" />
    <path d="M12 2v2.5" />
    <path d="M12 19.5V22" />
    <path d="m4.22 19.78 1.77-1.77" />
    <path d="m18.01 5.99 1.77-1.77" />
    <path d="m22 12-2.5 0" />
    <path d="m2 12h2.5" />
    <path d="m19.78 19.78-1.77-1.77" />
    <path d="m5.99 5.99-1.77-1.77" />
  </svg>
);

export default FootballIcon;
