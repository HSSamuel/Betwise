// src/components/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../api/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, logout, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser({ email, password });
      login(data.user, data.accessToken);
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div className="login-widget">
        <p>Welcome, {user.username}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="login-widget">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
