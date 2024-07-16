import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/auth/register",
        formData
      );
      if (res && res.data) {
        login(res.data.user, res.data.token);
        navigate("/user-landing");
      } else {
        console.error("Register response is missing data:", res);
      }
    } catch (err) {
      console.error("Error registering:", err.response || err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="page-title">Register</h1>
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
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
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
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
