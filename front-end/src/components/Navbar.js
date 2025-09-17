// src/components/Navbar.js
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
          <li>
            <NavLink to="/" onClick={handleLinkClick}>
              {t("navbar.home")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz" onClick={handleLinkClick}>
              {t("navbar.quiz")}
            </NavLink>
          </li>

          {/* Roadmaps Dropdown */}
          <li className="dropdown">
            <NavLink to="/roadmaps" onClick={handleLinkClick}>
              {t("roadmaps")}
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/roadmaps/engineering" onClick={handleLinkClick}>{t("engineering")}</NavLink></li>
              <li><NavLink to="/roadmaps/medicine" onClick={handleLinkClick}>{t("medicine")}</NavLink></li>
              <li><NavLink to="/roadmaps/arts" onClick={handleLinkClick}>{t("arts")}</NavLink></li>
              <li><NavLink to="/roadmaps/commerce" onClick={handleLinkClick}>{t("commerce")}</NavLink></li>
              <li><NavLink to="/roadmaps/teaching" onClick={handleLinkClick}>{t("teaching")}</NavLink></li>
            </ul>
          </li>

          {/* Colleges Dropdown */}
          <li className="dropdown">
            <NavLink to="/colleges" onClick={handleLinkClick}>
              {t("colleges")}
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/colleges/govt" onClick={handleLinkClick}>{t("govt_colleges")}</NavLink></li>
              <li><NavLink to="/colleges/private" onClick={handleLinkClick}>{t("private_colleges")}</NavLink></li>
              <li><NavLink to="/colleges/top" onClick={handleLinkClick}>{t("top_ranked")}</NavLink></li>
            </ul>
          </li>

          {/* Timeline */}
          <li>
            <NavLink to="/timeline" onClick={handleLinkClick}>
              {t("timeline")}
            </NavLink>
          </li>

          {/* Scholarships Dropdown */}
          <li className="dropdown">
            <NavLink to="/scholarships" onClick={handleLinkClick}>
              {t("scholarships")}
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/scholarships/ug" onClick={handleLinkClick}>{t("undergraduate")}</NavLink></li>
              <li><NavLink to="/scholarships/pg" onClick={handleLinkClick}>{t("postgraduate")}</NavLink></li>
              <li><NavLink to="/scholarships/international" onClick={handleLinkClick}>{t("international")}</NavLink></li>
            </ul>
          </li>

          {/* Resources Dropdown */}
          <li className="dropdown">
            <NavLink to="/resources" onClick={handleLinkClick}>
              {t("resources")}
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/resources/books" onClick={handleLinkClick}>{t("ebooks")}</NavLink></li>
              <li><NavLink to="/resources/skills" onClick={handleLinkClick}>{t("skills")}</NavLink></li>
              <li><NavLink to="/resources/articles" onClick={handleLinkClick}>{t("articles")}</NavLink></li>
            </ul>
          </li>

          {/* Others */}
          <li><NavLink to="/chatbot" onClick={handleLinkClick}>{t("chatbot")}</NavLink></li>
          <li><NavLink to="/profile" onClick={handleLinkClick}>{t("profile")}</NavLink></li>
          <li><NavLink to="/login" onClick={handleLinkClick}>{t("login")}</NavLink></li>
        </ul>

        {/* ✅ Language Switcher */}
        <div className="lang-switcher">
          <button onClick={() => i18n.changeLanguage("en")}>🇺🇸</button>
          <button onClick={() => i18n.changeLanguage("fr")}>🇫🇷</button>
          <button onClick={() => i18n.changeLanguage("es")}>🇪🇸</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
