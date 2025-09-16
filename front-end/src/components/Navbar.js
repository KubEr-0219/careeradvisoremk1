// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close menu + dropdown after clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="navbar-container">
        {/* ✅ Logo links to home */}
        <NavLink to="/" className="navbar-logo" onClick={handleLinkClick}>
          Build Your Way
        </NavLink>

        {/* Hamburger Menu (Mobile) */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
        </div>

        {/* Links */}
        <ul className={isOpen ? "navbar-links active" : "navbar-links"}>
          <li><NavLink to="/" onClick={handleLinkClick}>Home</NavLink></li>
          <li><NavLink to="/quiz" onClick={handleLinkClick}>Quiz</NavLink></li>

          {/* ✅ Roadmaps Dropdown */}
          <li className="dropdown">
            <span>Roadmaps ▾</span>
            <ul className="dropdown-menu">
              <li><NavLink to="/roadmaps/engineering" onClick={handleLinkClick}>Engineering</NavLink></li>
              <li><NavLink to="/roadmaps/medicine" onClick={handleLinkClick}>Medicine</NavLink></li>
              <li><NavLink to="/roadmaps/arts" onClick={handleLinkClick}>Arts</NavLink></li>
              <li><NavLink to="/roadmaps/commerce" onClick={handleLinkClick}>Commerce</NavLink></li>
              <li><NavLink to="/roadmaps/teaching" onClick={handleLinkClick}>Teaching</NavLink></li>
            </ul>
          </li>

          {/* ✅ Colleges Dropdown */}
          <li className="dropdown">
            <span>Colleges ▾</span>
            <ul className="dropdown-menu">
              <li><NavLink to="/colleges/govt" onClick={handleLinkClick}>Government Colleges</NavLink></li>
              <li><NavLink to="/colleges/private" onClick={handleLinkClick}>Private Colleges</NavLink></li>
              <li><NavLink to="/colleges/top" onClick={handleLinkClick}>Top Ranked</NavLink></li>
            </ul>
          </li>

          <li><NavLink to="/timeline" onClick={handleLinkClick}>Timeline</NavLink></li>

          {/* ✅ Scholarships Dropdown */}
          <li className="dropdown">
            <span>Scholarships ▾</span>
            <ul className="dropdown-menu">
              <li><NavLink to="/scholarships/ug" onClick={handleLinkClick}>Undergraduate</NavLink></li>
              <li><NavLink to="/scholarships/pg" onClick={handleLinkClick}>Postgraduate</NavLink></li>
              <li><NavLink to="/scholarships/international" onClick={handleLinkClick}>International</NavLink></li>
            </ul>
          </li>

          {/* ✅ Resources Dropdown */}
          <li className="dropdown">
            <span>Resources ▾</span>
            <ul className="dropdown-menu">
              <li><NavLink to="/resources/books" onClick={handleLinkClick}>E-books</NavLink></li>
              <li><NavLink to="/resources/skills" onClick={handleLinkClick}>Skill Building</NavLink></li>
              <li><NavLink to="/resources/articles" onClick={handleLinkClick}>Articles</NavLink></li>
            </ul>
          </li>

          <li><NavLink to="/chatbot" onClick={handleLinkClick}>Chatbot</NavLink></li>
          <li><NavLink to="/profile" onClick={handleLinkClick}>Profile</NavLink></li>
          <li><NavLink to="/login" onClick={handleLinkClick}>Login</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
