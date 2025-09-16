import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">Build Your Way</div>

        {/* Hamburger Menu (Mobile) */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
        </div>

        {/* Links */}
        <ul className={isOpen ? "navbar-links active" : "navbar-links"}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/quiz" onClick={() => setIsOpen(false)}>Quiz</Link></li>
          <li><Link to="/roadmaps" onClick={() => setIsOpen(false)}>Roadmaps</Link></li>
          <li><Link to="/colleges" onClick={() => setIsOpen(false)}>Colleges</Link></li>
          <li><Link to="/timeline" onClick={() => setIsOpen(false)}>Timeline</Link></li>
          <li><Link to="/scholarships" onClick={() => setIsOpen(false)}>Scholarships</Link></li>
          <li><Link to="/resources" onClick={() => setIsOpen(false)}>Resources</Link></li>
          <li><Link to="/chatbot" onClick={() => setIsOpen(false)}>Chatbot</Link></li>
          <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
          <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
