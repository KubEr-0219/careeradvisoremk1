// src/pages/Quiz.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Quiz.css"; // <-- new css file

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quiz/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAnswer = (value) => {
    const qid = questions[current].id;
    setAnswers((prev) => ({ ...prev, [qid]: value }));

    // If last question → submit
    if (current === questions.length - 1) {
      submit({ ...answers, [qid]: value });
    } else {
      // Move to next with animation delay
      setTimeout(() => setCurrent((prev) => prev + 1), 400);
    }
  };

  const submit = async (finalAnswers = answers) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/quiz/submit",
        { answers: finalAnswers, userEmail: email || undefined },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      const result = res.data.result;
      if (result && result._id) {
        localStorage.setItem("lastQuizResultId", result._id);
        navigate(`/quiz-result/${result._id}`);
      } else {
        navigate("/quiz-result");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz.");
    } finally {
      setLoading(false);
    }
  };

  if (!questions.length) return <p style={{ textAlign: "center" }}>Loading quiz...</p>;

  const q = questions[current];

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Career Quiz</h2>
      <p className="quiz-subtitle">
        Answer a few quick questions and we’ll suggest a path 🚀
      </p>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com (optional)"
        className="quiz-email"
      />

      {/* Progress */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      <p className="progress-text">
        Question {current + 1} of {questions.length}
      </p>

      {/* Question card */}
      <div key={q.id} className="question-card fade-in">
        <h3>{q.q}</h3>
        <div className="answer-buttons">
          <button onClick={() => handleAnswer("yes")} disabled={loading}>
            ✅ Yes
          </button>
          <button onClick={() => handleAnswer("no")} disabled={loading}>
            ❌ No
          </button>
        </div>
      </div>

      {loading && <p className="loading">Submitting...</p>}
    </div>
  );
}

export default Quiz;
