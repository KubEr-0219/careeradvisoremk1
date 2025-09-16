// src/pages/Scholarships.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Scholarships.css";

function Scholarships() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/scholarships")
      .then((r) => setList(r.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="scholarships-container">
      <h2 className="page-title">💰 Scholarships</h2>

      <div className="scholarships-grid">
        {list.map((s) => (
          <div key={s._id} className="scholarship-card fade-up">
            <h3>{s.title}</h3>
            <p className="provider">{s.provider}</p>
            <p className="deadline">
              ⏳ Deadline: {new Date(s.deadline).toLocaleDateString()}
            </p>
            <p>{s.description}</p>
            <a href={s.link} target="_blank" rel="noreferrer" className="apply-btn">
              Apply / Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scholarships;
