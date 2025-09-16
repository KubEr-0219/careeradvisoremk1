// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [results, setResults] = useState([]);
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      // Fetch user profile
      axios
        .get(`http://localhost:5000/api/users/profile/${email}`)
        .then((r) => setProfile(r.data))
        .catch(() => setProfile(null));

      // Fetch quiz results history
      axios
        .get(`http://localhost:5000/api/quiz/user/${email}`)
        .then((r) => setResults(r.data))
        .catch(() => setResults([]));
    }
  }, [email]);

  if (!email) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Please login first.
      </p>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      {profile ? (
        <>
          <h2 style={{ textAlign: "center" }}>👤 {profile.name || "No Name"}</h2>
          <p style={{ textAlign: "center" }}>Email: {profile.email}</p>

          {/* Retake Quiz Button */}
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <button
              onClick={() => navigate("/quiz")}
              style={{
                background: "#2e7d32",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "#43a047")
              }
              onMouseOut={(e) =>
                (e.target.style.background = "#2e7d32")
              }
            >
              🔄 Retake Quiz
            </button>
          </div>

          <hr style={{ margin: "20px 0" }} />

          <h3>📊 Quiz History</h3>
          {results.length > 0 ? (
            <ul>
              {results.map((r) => (
                <li
                  key={r._id}
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                >
                  <strong>Suggestion:</strong> {r.suggestion} <br />
                  <em>{r.summary}</em> <br />
                  <small>
                    Taken on {new Date(r.createdAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No quiz results yet.</p>
          )}
        </>
      ) : (
        <p style={{ textAlign: "center" }}>No profile found</p>
      )}
    </div>
  );
}

export default Profile;
