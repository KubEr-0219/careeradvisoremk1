import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Your Personalized Career & Education Advisor</h1>
        <p>Discover courses, careers, colleges, and timelines tailored just for you.</p>
        <button className="start-btn">🚀 Start Quiz</button>
      </header>

      {/* Feature Cards */}
      <section className="features">
        <div className="feature-card">
          <h3>✅ Take Quiz</h3>
          <p>Get personalized guidance</p>
        </div>

        <div className="feature-card">
          <h3>📍 Roadmaps</h3>
          <p>Visual career path from degree to jobs</p>
        </div>

        <div className="feature-card">
          <h3>🏫 Colleges</h3>
          <p>Find nearby government colleges</p>
        </div>

        <div className="feature-card">
          <h3>📅 Timeline</h3>
          <p>Track admissions & scholarships</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
