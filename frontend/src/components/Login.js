import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      console.log("Login response:", res); // Log the entire response
      if (res && res.data) {
        login(res.data.user, res.data.token);
        navigate("/my-vinyasas");
      } else {
        console.error("Login response is missing data:", res);
        // Handle missing data scenario
      }
    } catch (err) {
      console.error("Error logging in:", err.response || err.message);
      // Handle login error scenario
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Join Now</a>
      </p>
    </div>
  );
};

export default Login;
