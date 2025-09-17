// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ i18n hook
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ translation function

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {t("home.title")}
          </h1>
          <p className="hero-subtext">
            {t("home.subtitle")}
          </p>
          <button className="start-btn" onClick={() => navigate("/quiz")}>
            🚀 {t("home.startQuiz")}
          </button>
        </div>
      </header>

      {/* Feature Cards */}
      <section className="features">
        <div
          className="feature-card clickable fade-up"
          onClick={() => navigate("/quiz")}
        >
          <h3>✅ {t("home.cards.quiz.title")}</h3>
          <p>{t("home.cards.quiz.text")}</p>
        </div>

        <div
          className="feature-card clickable fade-up"
          onClick={() => navigate("/roadmaps")}
        >
          <h3>📍 {t("home.cards.roadmaps.title")}</h3>
          <p>{t("home.cards.roadmaps.text")}</p>
        </div>

        <div
          className="feature-card clickable fade-up"
          onClick={() => navigate("/colleges")}
        >
          <h3>🏫 {t("home.cards.colleges.title")}</h3>
          <p>{t("home.cards.colleges.text")}</p>
        </div>

        <div
          className="feature-card clickable fade-up"
          onClick={() => navigate("/timeline")}
        >
          <h3>📅 {t("home.cards.timeline.title")}</h3>
          <p>{t("home.cards.timeline.text")}</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
