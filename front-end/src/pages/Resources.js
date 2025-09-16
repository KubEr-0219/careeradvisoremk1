// src/pages/Resources.js
import React from "react";

const resources = [
  { title:"NCERT Textbooks", link:"https://ncert.nic.in" },
  { title:"NPTEL (courses)", link:"https://nptel.ac.in" },
  { title:"Diksha (teacher resources)", link:"https://diksha.gov.in" }
];

function Resources(){
  return (
    <div style={{maxWidth:900, margin:"30px auto", padding:20}}>
      <h2>Study Resources</h2>
      <ul>
        {resources.map((r,i)=>(
          <li key={i}><a href={r.link} target="_blank" rel="noreferrer">{r.title}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default Resources;