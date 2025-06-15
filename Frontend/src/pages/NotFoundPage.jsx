// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css"; // We'll add some simple styles

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="home-button">
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
