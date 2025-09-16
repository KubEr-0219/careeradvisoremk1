// src/pages/RoadmapDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaGraduationCap, FaBriefcase, FaBookOpen, FaStar } from "react-icons/fa";
import "./RoadmapDetail.css";

function RoadmapDetail() {
  const { key } = useParams();
  const [road, setRoad] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/roadmaps/${key}`)
      .then((r) => setRoad(r.data))
      .catch((err) => console.error(err));
  }, [key]);

  if (!road) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading roadmap...</p>;
  }

  // Choose an icon based on stage type
  const getIcon = (stage) => {
    if (stage.toLowerCase().includes("school")) return <FaBookOpen className="icon school" />;
    if (stage.toLowerCase().includes("degree") || stage.toLowerCase().includes("college"))
      return <FaGraduationCap className="icon degree" />;
    if (stage.toLowerCase().includes("career") || stage.toLowerCase().includes("job"))
      return <FaBriefcase className="icon career" />;
    return <FaStar className="icon other" />;
  };

  return (
    <div className="roadmap-detail">
      <h2>📍 {road.title}</h2>
      <p className="roadmap-description">{road.description}</p>

      <div className="timeline">
        {road.steps && road.steps.map((step, idx) => (
          <div key={idx} className="timeline-step">
            <div className="timeline-icon">{getIcon(step.stage)}</div>
            <div className="timeline-content">
              <h3>{step.stage}</h3>
              <p>{step.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapDetail;
