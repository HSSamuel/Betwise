import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginUser, registerUser } from "../api/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isLogin ? loginUser : registerUser;
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    toast.promise(action(payload), {
      loading: isLogin ? "Logging in..." : "Creating account...",
      success: (data) => {
        login(data.user, data.accessToken);
        navigate("/");
        return <b>{data.message || "Success!"}</b>;
      },
      error: (err) => <b>{err.message}</b>,
    });
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h2>{isLogin ? "Welcome Back" : "Create Your Account"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
