// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";  // ✅ custom styles

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        {/* ✅ Wrapped content in a glass box */}
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
        <div
          className="feature-card clickable fade-up"
          onClick={() => navigate("/quiz")}
        >
          <h3>✅ Take Quiz</h3>
          <p>Get personalized guidance</p>
        </div>

        <div
          className="feature-card clickable fade-up"
          onClick={() => navigate("/roadmaps")}
        >
          <h3>📍 Roadmaps</h3>
          <p>Visual career path from degree to jobs</p>
        </div>

        <div
          className="feature-card clickable fade-up"
          onClick={() => navigate("/colleges")}
        >
          <h3>🏫 Colleges</h3>
          <p>Find nearby government colleges</p>
        </div>

        <div
          className="feature-card clickable fade-up"
          onClick={() => navigate("/timeline")}
        >
          <h3>📅 Timeline</h3>
          <p>Track admissions & scholarships</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
