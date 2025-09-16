const express = require("express");
const router = express.Router();

// Sample roadmaps
const roadmaps = {
  engineering: [
    "Finish Class 12 with PCM",
    "Pursue B.Tech / BE in Engineering",
    "Choose specialization (CSE, Mechanical, Civil, etc.)",
    "Get internship during studies",
    "Start career as Software Engineer, Data Analyst, Mechanical Engineer, etc."
  ],
  medicine: [
    "Finish Class 12 with PCB",
    "Clear NEET exam",
    "Pursue MBBS / Nursing / Pharmacy",
    "Internship at hospitals",
    "Career as Doctor, Nurse, Pharmacist, Surgeon"
  ],
  arts: [
    "Finish Class 12 (Arts/Any Stream)",
    "Pursue BA / Fine Arts / Mass Communication",
    "Build creative portfolio",
    "Internships in media/art",
    "Career as Writer, Designer, Journalist, Media Professional"
  ],
  commerce: [
    "Finish Class 12 (Commerce/Any Stream)",
    "Pursue B.Com / BBA / CA / MBA",
    "Get internships in finance/business",
    "Career as Accountant, Business Analyst, Manager, Entrepreneur"
  ],
  teaching: [
    "Finish Class 12 (Any Stream)",
    "Pursue B.Ed / BA + B.Ed / MA + NET",
    "Gain teaching experience",
    "Career as Teacher, Lecturer, Researcher"
  ]
};

// Get roadmap for a career
router.get("/:path", (req, res) => {
  const { path } = req.params;
  res.json(roadmaps[path] || ["No roadmap available"]);
});

module.exports = router;
