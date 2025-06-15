// src/components/Logo.jsx
import React from "react";

const Logo = ({ className }) => (
  <svg
    className={className}
    width="120"
    height="40"
    viewBox="0 0 120 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      {`.logo-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; fill: #ffffff; }`}
    </style>
    {/* Icon part of the logo */}
    <g>
      <path
        d="M10 5 L10 35 L20 35 Q30 35 30 25 C30 15 20 15 20 15 L10 15"
        fill="#3b82f6"
      />
      <path
        d="M15 20 Q20 10 25 20 T35 20"
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    {/* Text part of the logo */}
    <text x="40" y="27" className="logo-text" fontSize="20" fontWeight="bold">
      BetWise
    </text>
  </svg>
);

export default Logo;
