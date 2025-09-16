// src/pages/Timeline.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Timeline(){
  const [events, setEvents] = useState([]);
  const [reminders, setReminders] = useState(JSON.parse(localStorage.getItem("reminders")||"[]"));

  useEffect(()=>{
    axios.get("http://localhost:5000/api/timeline")
      .then(r => setEvents(r.data))
      .catch(e=>console.error(e));
  },[]);

  const toggleReminder = (id) => {
    let updated = reminders.includes(id) ? reminders.filter(x=>x!==id) : [...reminders, id];
    setReminders(updated);
    localStorage.setItem("reminders", JSON.stringify(updated));
  };

  return (
    <div style={{maxWidth:900, margin:"30px auto", padding:20}}>
      <h2>Timeline & Events</h2>
      <div>
        {events.map(ev => (
          <div key={ev._id} className="feature-card" style={{marginBottom:12}}>
            <h3>{ev.title}</h3>
            <p>{ev.description}</p>
            <p><b>From:</b> {new Date(ev.startDate).toLocaleDateString()} <b>To:</b> {new Date(ev.endDate).toLocaleDateString()}</p>
            <button onClick={()=>toggleReminder(ev._id)}>
              {reminders.includes(ev._id) ? "Remove Reminder" : "Set Reminder"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
