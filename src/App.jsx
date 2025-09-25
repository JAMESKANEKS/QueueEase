import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import QueueForm from "./QueueForm";
import Admin from "./admin/Admin";
import Display from "./Display";
import Ticket from "./Ticket";
import Login from "./admin/Login";
import "./styles/index.css";
import "./styles/App.css";

function App() {
  const [auth, setAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ controls mobile nav

  return (
    <Router>
      <header className="app-header">
        <div className="header-container">
          <img className="logo1" src="/logo1.png"/>
          <h1 className="logo">Registrar Queue System</h1>
          {/* Hamburger button (visible on mobile) */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Nav links */}
          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/display" onClick={() => setMenuOpen(false)}>Display</Link>
            <Link to="/admin" onClick={() => setMenuOpen(false)}>Registrar Console</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<QueueForm />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/display" element={<Display />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route
          path="/admin"
          element={auth ? <Admin setAuth={setAuth} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
