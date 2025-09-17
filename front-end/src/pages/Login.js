// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // custom styles

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const res = await axios.post("http://localhost:5000/api/users/register", {
          name,
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      } else {
        const res = await axios.post("http://localhost:5000/api/users/login", {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error logging in");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Tab Switcher */}
        <div className="tab-switcher">
          <button
            className={!isRegister ? "active" : ""}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            className={isRegister ? "active" : ""}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        <h2>{isRegister ? "Create Account ✨" : "Welcome Back 👋"}</h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-group">
              <span className="icon">👤</span>
              <input
                type="text"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Full Name</label>
            </div>
          )}

          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <button type="submit" className="login-btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
