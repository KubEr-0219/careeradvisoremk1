// src/pages/QuizResult.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./QuizResult.css";

function QuizResult() {
  const { id } = useParams(); // from route /quiz-result/:id
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const resultId = id || localStorage.getItem("lastQuizResultId");
    if (!resultId) return;

    axios
      .get(`http://localhost:5000/api/quiz/result/${resultId}`)
      .then((res) => setResult(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!result) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading result...</p>;
  }

  // Prepare chart data
  const chartData = Object.entries(result.scores || {}).map(([k, v]) => ({
    name: k.charAt(0).toUpperCase() + k.slice(1),
    value: v,
  }));

  const COLORS = ["#1d4ed8", "#16a34a", "#9333ea", "#ea580c", "#0ea5e9"];

  return (
    <div className="quiz-result-container fade-in">
      <h2 className="quiz-result-title">🎯 Your Career Path Suggestion</h2>

      {/* Summary Card */}
      <div className="result-card">
        <h3>{result.suggestion}</h3>
        <p>{result.summary}</p>
      </div>

      {/* Chart */}
      <div className="chart-section">
        <h3>Your Scores</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Actions */}
      <button className="retake-btn" onClick={() => navigate("/quiz")}>
        🔄 Retake Quiz
      </button>
    </div>
  );
}

export default QuizResult;
