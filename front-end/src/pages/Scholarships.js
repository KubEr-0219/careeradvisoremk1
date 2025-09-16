// src/pages/Scholarships.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Scholarships(){
  const [list, setList] = useState([]);
  useEffect(()=> {
    axios.get("http://localhost:5000/api/scholarships")
      .then(r => setList(r.data))
      .catch(e => console.error(e));
  }, []);

  return (
    <div style={{maxWidth:900, margin:"30px auto", padding:20}}>
      <h2>Scholarships</h2>
      {list.map(s => (
        <div key={s._id} className="feature-card" style={{marginBottom:12}}>
          <h3>{s.title}</h3>
          <p>{s.provider} • Deadline: {new Date(s.deadline).toLocaleDateString()}</p>
          <p>{s.description}</p>
          <a href={s.link} target="_blank" rel="noreferrer">Apply / Details</a>
        </div>
      ))}
    </div>
  );
}

export default Scholarships;