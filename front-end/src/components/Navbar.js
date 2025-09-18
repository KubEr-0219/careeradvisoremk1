import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="navbar-container">
        {/* ✅ Logo */}
        <NavLink to="/" className="navbar-logo" onClick={handleLinkClick}>
          Build Your Way
        </NavLink>

        {/* ✅ Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
        </div>

        {/* ✅ Navigation Links */}
        <ul className={isOpen ? "navbar-links active" : "navbar-links"}>
          <li><NavLink to="/" onClick={handleLinkClick}>{t("navbar.home")}</NavLink></li>
          <li><NavLink to="/quiz" onClick={handleLinkClick}>{t("navbar.quiz")}</NavLink></li>

          {/* ✅ Roadmaps Mega Menu */}
          <li className="dropdown">
            <NavLink to="/roadmaps">{t("navbar.roadmaps")}</NavLink>
            <div className="mega-menu">
              <div className="menu-section">
                <h4>Streams</h4>
                <NavLink to="/roadmaps/engineering">Engineering</NavLink>
                <NavLink to="/roadmaps/medicine">Medicine</NavLink>
                <NavLink to="/roadmaps/arts">Arts</NavLink>
                <NavLink to="/roadmaps/commerce">Commerce</NavLink>
                <NavLink to="/roadmaps/teaching">Teaching</NavLink>
              </div>
            </div>
          </li>

          {/* ✅ Colleges Mega Menu */}
          <li className="dropdown">
            <NavLink to="/colleges">{t("navbar.colleges")}</NavLink>
            <div className="mega-menu">
              <div className="menu-section">
                <h4>Types</h4>
                <NavLink to="/colleges/govt">Government Colleges</NavLink>
                <NavLink to="/colleges/private">Private Colleges</NavLink>
                <NavLink to="/colleges/top">Top Ranked</NavLink>
              </div>
            </div>
          </li>

          <li><NavLink to="/timeline" onClick={handleLinkClick}>{t("navbar.timeline")}</NavLink></li>

          {/* ✅ Scholarships Mega Menu */}
          <li className="dropdown">
            <NavLink to="/scholarships">{t("navbar.scholarships")}</NavLink>
            <div className="mega-menu">
              <div className="menu-section">
                <h4>Levels</h4>
                <NavLink to="/scholarships/ug">Undergraduate</NavLink>
                <NavLink to="/scholarships/pg">Postgraduate</NavLink>
                <NavLink to="/scholarships/international">International</NavLink>
              </div>
            </div>
          </li>

          {/* ✅ Resources Mega Menu */}
          <li className="dropdown">
            <NavLink to="/resources">{t("navbar.resources")}</NavLink>
            <div className="mega-menu">
              <div className="menu-section">
                <h4>Resources</h4>
                <NavLink to="/resources/books">E-Books</NavLink>
                <NavLink to="/resources/skills">Skill Building</NavLink>
                <NavLink to="/resources/articles">Articles</NavLink>
              </div>
            </div>
          </li>

          <li><NavLink to="/chatbot" onClick={handleLinkClick}>{t("navbar.chatbot")}</NavLink></li>
          <li><NavLink to="/profile" onClick={handleLinkClick}>{t("navbar.profile")}</NavLink></li>
          <li><NavLink to="/login" className="login-btn" onClick={handleLinkClick}>{t("navbar.login")}</NavLink></li>
        </ul>

        {/* ✅ Language Switcher Dropdown */}
        <div className="lang-dropdown">
          <button className="lang-btn">Lang ▾</button>
          <div className="lang-menu">
            <button onClick={() => i18n.changeLanguage("en")}>English</button>
            <button onClick={() => i18n.changeLanguage("fr")}>Français</button>
            <button onClick={() => i18n.changeLanguage("es")}>Español</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
