// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Personalized Career & Education Advisor
          </h1>
          <p className="hero-subtext">
            Discover courses, careers, colleges, and timelines tailored just for you.
          </p>
          <button className="start-btn" onClick={() => navigate("/quiz")}>
            🚀 Start Quiz
          </button>
        </div>
      </header>

      {/* Feature Cards */}
      <section className="features">
        <div className="feature-card" onClick={() => navigate("/quiz")}>
          <div className="icon-badge">✅</div>
          <h3>Take Quiz</h3>
          <p>Get personalized guidance</p>
        </div>

        <div className="feature-card" onClick={() => navigate("/roadmaps")}>
          <div className="icon-badge">📍</div>
          <h3>Roadmaps</h3>
          <p>Visual career path from degree to jobs</p>
        </div>

        <div className="feature-card" onClick={() => navigate("/colleges")}>
          <div className="icon-badge">🏫</div>
          <h3>Colleges</h3>
          <p>Find nearby government colleges</p>
        </div>

        <div className="feature-card" onClick={() => navigate("/timeline")}>
          <div className="icon-badge">📅</div>
          <h3>Timeline</h3>
          <p>Track admissions & scholarships</p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose">
        <h2>🌟 Why Choose Build Your Way?</h2>
        <p>✔ Personalized career recommendations based on your strengths.</p>
        <p>✔ Easy-to-follow roadmaps from school to career.</p>
        <p>✔ Explore colleges, scholarships, and timelines in one place.</p>
        <p>✔ Friendly AI chatbot for instant answers.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Build Your Way • All Rights Reserved 🚀
      </footer>
    </div>
  );
}

export default Home;
