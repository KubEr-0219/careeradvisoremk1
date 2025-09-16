import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";
import Roadmaps from "./pages/Roadmaps";
import RoadmapDetail from "./pages/RoadmapDetail";
import Colleges from "./pages/Colleges";
import Timeline from "./pages/Timeline";
import Scholarships from "./pages/Scholarships";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz-result/:id" element={<QuizResult />} />
    
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/roadmaps/:key" element={<RoadmapDetail />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
