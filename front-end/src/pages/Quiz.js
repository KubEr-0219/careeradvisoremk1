// src/pages/Quiz.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Quiz.css"; // 👈 we'll style it separately

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quiz/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (step < questions.length - 1) {
      setTimeout(() => setStep((prev) => prev + 1), 400); // smooth move to next
    }
  };

  const submit = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/quiz/submit",
        { answers, userEmail: email || undefined },
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

  const progress = ((step + 1) / questions.length) * 100;

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

      {/* Progress Bar */}
      <div className="quiz-progress">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {questions.length > 0 && (
        <div className="quiz-card">
          <h3 className="quiz-step">
            Question {step + 1} of {questions.length}
          </h3>
          <p className="quiz-question">{questions[step].q}</p>
          <div className="quiz-options">
            <button
              className="btn-yes"
              onClick={() => handleAnswer(questions[step].id, "yes")}
            >
              ✅ Yes
            </button>
            <button
              className="btn-no"
              onClick={() => handleAnswer(questions[step].id, "no")}
            >
              ❌ No
            </button>
          </div>
        </div>
      )}

      {step === questions.length - 1 && Object.keys(answers).length === questions.length && (
        <button
          className="quiz-submit"
          disabled={loading}
          onClick={submit}
        >
          {loading ? "Submitting..." : "See My Results 🎯"}
        </button>
      )}
    </div>
  );
}

export default Quiz;
