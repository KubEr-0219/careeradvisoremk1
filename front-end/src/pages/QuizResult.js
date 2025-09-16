// src/pages/QuizResult.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";
import "./QuizResult.css";

function QuizResult() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        if (id) {
          const res = await axios.get(`http://localhost:5000/api/quiz/result/${id}`);
          setResult(res.data);
        } else {
          const lastId = localStorage.getItem("lastQuizResultId");
          if (lastId) {
            const res = await axios.get(`http://localhost:5000/api/quiz/result/${lastId}`);
            setResult(res.data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchResult();
  }, [id]);

  if (!result) return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading result...</p>;

  const data = Object.entries(result.scores || {}).map(([key, value]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
  }));

  return (
    <div className="result-container">
      <div className="result-card fade-up">
        <h2 className="result-title">🎯 Your Career Suggestion</h2>
        <h3 className="result-suggestion">{result.suggestion}</h3>
        <p className="result-summary">{result.summary}</p>
      </div>

      <div className="chart-container fade-up">
        <h3>📊 Your Scores</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#4caf50"
              fill="#81c784"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <button className="back-btn" onClick={() => navigate("/roadmaps")}>
        🌍 Explore Roadmaps
      </button>
    </div>
  );
}

export default QuizResult;
