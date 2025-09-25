import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // go up one level (from src/admin to src)


const Login = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Only 2 allowed accounts
  const accounts = [
    { username: "admin1", password: "pass123" },
    { username: "admin2", password: "pass456" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const valid = accounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (valid) {
      setAuth(true);
      navigate("/admin"); // redirect to registrar console
    } else {
      alert("❌ Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Registrar Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {/* ✅ Footer for school details */}
      <footer className="queueform-footer">
        <p><b>Consolatrix College of Toledo City</b></p>
        <p>Contact: (032) 466-87771 466-1690 | Email: consolatrixcollegeoftoldeo2005@gmail.com</p>
        <p>© {new Date().getFullYear()} Consolatrix College - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Login;
