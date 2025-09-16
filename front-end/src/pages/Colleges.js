// src/pages/Colleges.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Colleges(){
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");

  const fetch = () => {
    axios.get(`http://localhost:5000/api/colleges?q=${encodeURIComponent(q)}`)
      .then(r => setList(r.data))
      .catch(e=>console.error(e));
  };

  useEffect(()=>{ fetch(); }, []);

  return (
    <div style={{maxWidth:1000, margin:"30px auto", padding:20}}>
      <h2>Nearby Government Colleges</h2>
      <div style={{margin:"10px 0 20px"}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search colleges..." style={{padding:8, width:320}}/>
        <button onClick={fetch} style={{marginLeft:8, padding:"8px 12px"}}>Search</button>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16}}>
        {list.map(c => (
          <div key={c._id} className="feature-card" style={{textAlign:"left"}}>
            <h3 style={{color:"#1b5e20"}}>{c.name}</h3>
            <p style={{margin:0}}><b>District:</b> {c.district}</p>
            <p style={{margin:0}}><b>Courses:</b> {c.courses.join(", ")}</p>
            <p style={{margin:0}}><b>Facilities:</b> {c.facilities.join(", ")}</p>
            <p style={{marginTop:8}}><a href={`tel:${c.contact}`}>Contact: {c.contact}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Colleges;
