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

  // ✅ Safe getIcon with stage-based color classes
  const getIcon = (stage = "") => {
    const lower = stage?.toLowerCase?.() || "";
    if (lower.includes("school"))
      return <FaBookOpen className="icon school" title="School Stage" />;
    if (lower.includes("degree") || lower.includes("college"))
      return <FaGraduationCap className="icon degree" title="Degree Stage" />;
    if (lower.includes("career") || lower.includes("job"))
      return <FaBriefcase className="icon career" title="Career Stage" />;
    return <FaStar className="icon other" title="Other Stage" />;
  };

  return (
    <div className="roadmap-detail">
      <h2>📍 {road.title}</h2>
      <p className="roadmap-description">{road.description}</p>

      <div className="timeline">
        {road.steps?.filter(Boolean).map((step, idx) => (
          <div key={idx} className={`timeline-step ${step?.stage?.toLowerCase?.() || "other"}`}>
            <div className="timeline-icon">{getIcon(step?.stage)}</div>
            <div className="timeline-content">
              <h3>{step?.stage || "Untitled Stage"}</h3>
              <p>{step?.details || "No details available."}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapDetail;
