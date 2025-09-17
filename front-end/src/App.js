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

        {/* Roadmaps */}
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/roadmaps/:key" element={<RoadmapDetail />} />

        {/* Colleges */}
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/colleges/govt" element={<Colleges />} />
        <Route path="/colleges/private" element={<Colleges />} />
        <Route path="/colleges/top" element={<Colleges />} />

        {/* Scholarships */}
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/scholarships/ug" element={<Scholarships />} />
        <Route path="/scholarships/pg" element={<Scholarships />} />
        <Route path="/scholarships/international" element={<Scholarships />} />

        {/* Resources */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/books" element={<Resources />} />
        <Route path="/resources/skills" element={<Resources />} />
        <Route path="/resources/articles" element={<Resources />} />

        <Route path="/timeline" element={<Timeline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
