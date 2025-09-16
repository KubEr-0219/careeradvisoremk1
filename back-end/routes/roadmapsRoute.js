// backend/routes/roadmapsRoute.js
const express = require("express");
const router = express.Router();

const roadmaps = [
  {
    key: "engineering",
    title: "Engineering & Technology",
    description: "Explore core branches like Computer Science, Mechanical, Civil, and more.",
    steps: [
      "Choose science stream with PCM in 11th",
      "Prepare for entrance exams (JEE, State CET)",
      "Get admission into B.Tech/B.E program",
      "Specialize in your branch",
      "Pursue M.Tech or MBA for higher studies"
    ],
    icon: "⚙️",
    color: "#2563eb" // blue
  },
  {
    key: "medicine",
    title: "Medicine & Healthcare",
    description: "Become a doctor, nurse, or healthcare professional.",
    steps: [
      "Choose science stream with PCB in 11th",
      "Prepare for NEET exam",
      "Get admission into MBBS/BDS/Nursing",
      "Specialize through MD/MS",
      "Practice or pursue research"
    ],
    icon: "🩺",
    color: "#dc2626" // red
  },
  {
    key: "arts",
    title: "Arts & Humanities",
    description: "Explore creativity in literature, design, and fine arts.",
    steps: [
      "Choose Arts/Humanities stream in 11th",
      "Pursue BA/BFA in chosen field",
      "Specialize with MA or Diploma",
      "Build portfolio or prepare for competitive exams"
    ],
    icon: "🎨",
    color: "#9333ea" // purple
  },
  {
    key: "commerce",
    title: "Commerce & Business",
    description: "For careers in business, finance, and management.",
    steps: [
      "Choose Commerce stream in 11th",
      "Pursue B.Com, BBA, or CA foundation",
      "Specialize in Finance/Marketing/HR",
      "Pursue MBA or professional certifications"
    ],
    icon: "💼",
    color: "#16a34a" // green
  },
  {
    key: "teaching",
    title: "Education & Teaching",
    description: "Shape the future by becoming a teacher or professor.",
    steps: [
      "Pursue Bachelor's in chosen subject",
      "Complete B.Ed or Teacher Training",
      "Clear NET/CTET/TET exams",
      "Pursue M.Ed or PhD for higher teaching roles"
    ],
    icon: "📚",
    color: "#f59e0b" // yellow/orange
  }
];

router.get("/", (req, res) => res.json(roadmaps));
router.get("/:key", (req, res) => {
  const r = roadmaps.find(r => r.key === req.params.key);
  res.json(r || {});
});

module.exports = router;
