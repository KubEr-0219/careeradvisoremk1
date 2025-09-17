import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Colleges.css";

function Colleges() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");

  const fetch = () => {
    axios
      .get(`http://localhost:5000/api/colleges?q=${encodeURIComponent(q)}`)
      .then((r) => setList(r.data))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="colleges-container">
      {/* New styled heading */}
      <h2 className="page-title">🎓 Nearby Government Colleges</h2>
      <p className="page-subtitle">
        Search and explore institutions offering quality education
      </p>

      <div className="search-box">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search colleges..."
        />
        <button onClick={fetch}>Search</button>
      </div>

      <div className="colleges-grid">
        {list.map((c) => (
          <div key={c._id} className="college-card fade-up">
            <h3>{c.name}</h3>
            <p>
              <b>District:</b> {c.district}
            </p>
            <p>
              <b>Courses:</b> {c.courses.join(", ")}
            </p>
            <p>
              <b>Facilities:</b> {c.facilities.join(", ")}
            </p>
            <p className="contact">
              <a href={`tel:${c.contact}`}>📞 {c.contact}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Colleges;
