// src/pages/Chatbot.js
import React, { useState } from "react";

const KB = [
  { q: "Which stream after 10th", a: "Think about your strengths. Science for engineers/medicine, Commerce for business, Arts for creative & social fields." },
  { q: "Is graduation worth it", a: "Yes — long-term career opportunities and better job prospects vs short-term courses. Depends on career goals." },
  { q: "How to find government colleges", a: "Go to Colleges page and search by district. We list nearby government colleges and courses." }
];

function Chatbot(){
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState([]);

  const send = () => {
    if(!msg) return;
    const user = msg;
    let found = KB.find(k => user.toLowerCase().includes(k.q.toLowerCase().split(" ")[0]));
    const bot = found ? found.a : "Sorry — I'm a demo bot. Try asking about streams, colleges or scholarships.";
    setHistory(h => [...h, { from: "user", text: user }, { from: "bot", text: bot }]);
    setMsg("");
  };

  return (
    <div style={{maxWidth:800, margin:"30px auto", padding:20}}>
      <h2>Career Chatbot (Demo)</h2>
      <div style={{border:"1px solid #eee", padding:12, minHeight:200, marginBottom:12}}>
        {history.map((m,i)=> <div key={i} style={{textAlign: m.from==="user"?"right":"left", margin:"6px 0"}}><b>{m.from==="user"?"You":"Advisor"}:</b> {m.text}</div>)}
      </div>
      <input value={msg} onChange={e=>setMsg(e.target.value)} style={{padding:8, width:"80%"}}/>
      <button onClick={send} style={{marginLeft:8}}>Send</button>
    </div>
  );
}

export default Chatbot;