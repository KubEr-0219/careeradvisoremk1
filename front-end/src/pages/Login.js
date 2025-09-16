// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
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
    <div style={{ maxWidth: 700, margin: "30px auto", padding: 20 }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      {isRegister && (
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginBottom: 8, padding: 8 }}
        />
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 8, padding: 8 }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 8, padding: 8 }}
      />

      <button onClick={handleSubmit} style={{ padding: 8 }}>
        {isRegister ? "Register" : "Login"}
      </button>

      <p style={{ marginTop: 10 }}>
        {isRegister ? "Already have an account?" : "Need an account?"}{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login" : "Register"}
        </span>
      </p>
    </div>
  );
}

export default Login;
