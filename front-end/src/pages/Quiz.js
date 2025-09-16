import React, { useEffect, useState } from "react";
import axios from "axios";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/quiz/questions")
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/quiz/submit", { answers })
      .then(res => {
        setResult(res.data.suggestion);

        // Fetch roadmap
        const pathKey = res.data.suggestion.toLowerCase().split(" ")[0]; // crude mapping
        axios.get(`http://localhost:5000/api/roadmap/${pathKey}`)
          .then(r => setRoadmap(r.data))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  const allAnswered = questions.length > 0 && 
                      questions.every(q => answers[q.id]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Career Quiz</h2>
      {questions.map(q => (
        <div key={q.id} style={{ margin: "15px" }}>
          <p><b>{q.question}</b></p>
          <label>
            <input type="radio" name={q.id} value="yes"
              onChange={() => handleChange(q.id, "yes")} /> Yes
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input type="radio" name={q.id} value="no"
              onChange={() => handleChange(q.id, "no")} /> No
          </label>
        </div>
      ))}
      <button 
        onClick={handleSubmit} 
        disabled={!allAnswered}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: allAnswered ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          cursor: allAnswered ? "pointer" : "not-allowed"
        }}
      >
        Submit Quiz
      </button>
      {result && (
        <div style={{ marginTop: "30px" }}>
          <h3>🎯 Suggested Path: {result}</h3>
          <h4>📌 Roadmap:</h4>
          <ul style={{ textAlign: "left", maxWidth: "600px", margin: "10px auto" }}>
            {roadmap.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Quiz;
