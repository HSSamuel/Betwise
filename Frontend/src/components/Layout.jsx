// src/components/Layout.jsx
import React from "react";
import "./Layout.css"; // We will create this CSS file next

/**
 * A simple layout component that wraps the main content of each page
 * to provide consistent padding and structure.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the layout.
 */
const Layout = ({ children }) => {
  return <div className="page-layout">{children}</div>;
};

export default Layout;
