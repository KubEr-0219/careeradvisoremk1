import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#f5f5f5", display: "flex", justifyContent: "space-between" }}>
      <h2 style={{ margin: 0 }}>Build Your Way</h2>
      <div>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/quiz" style={{ margin: "0 10px" }}>Quiz</Link>
        <Link to="/colleges" style={{ margin: "0 10px" }}>Colleges</Link>
        <Link to="/timeline" style={{ margin: "0 10px" }}>Timeline</Link>
      </div>
    </nav>
  );
}

export default Navbar;
