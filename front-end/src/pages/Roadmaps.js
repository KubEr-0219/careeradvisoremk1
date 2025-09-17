import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaUserMd,
  FaPaintBrush,
  FaBusinessTime,
  FaChalkboardTeacher,
} from "react-icons/fa";
import "./Roadmaps.css";

function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/roadmaps")
      .then((res) => setRoadmaps(res.data))
      .catch((err) => console.error(err));
  }, []);

  const categoryStyles = {
    engineering: { icon: <FaLaptopCode />, className: "engineering" },
    medicine: { icon: <FaUserMd />, className: "medicine" },
    arts: { icon: <FaPaintBrush />, className: "arts" },
    commerce: { icon: <FaBusinessTime />, className: "commerce" },
    teaching: { icon: <FaChalkboardTeacher />, className: "teaching" },
  };

  return (
    <div className="roadmaps-container">
      {/* New styled heading */}
      <h2 className="page-title">📍 Career Roadmaps</h2>
      <p className="page-subtitle">Explore subject-to-career pathways</p>

      <div className="roadmap-grid">
        {roadmaps.map((r, idx) => {
          const style = categoryStyles[r.key] || {
            icon: "📘",
            className: "default",
          };

          return (
            <Link to={`/roadmaps/${r.key}`} key={idx} className="roadmap-link">
              <div
                className={`roadmap-card ${style.className} fade-up`}
                style={{ animationDelay: `${0.2 * idx}s` }}
              >
                <div className="icon-box">{style.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Roadmaps;
