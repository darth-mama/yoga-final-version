import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/auth/login",
        formData
      );
      if (res && res.data) {
        login(res.data.user, res.data.token);
        navigate("/user-landing");
      } else {
        console.error("Login response is missing data:", res);
      }
    } catch (err) {
      console.error("Error logging in:", err.response || err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="page-title">Login</h1>
      <form onSubmit={onSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="Username"
          required
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
