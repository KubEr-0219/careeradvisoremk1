const express = require("express");
const router = express.Router();

// Extended quiz questions
const questions = [
  { id: 1, question: "Do you enjoy solving math problems?", type: "aptitude" },
  { id: 2, question: "Do you like working with computers?", type: "interest" },
  { id: 3, question: "Are you more comfortable with creative tasks (art, writing)?", type: "interest" },
  { id: 4, question: "Do you enjoy conducting science experiments?", type: "aptitude" },
  { id: 5, question: "Would you like to help sick people get better?", type: "interest" },
  { id: 6, question: "Do you like analyzing data and patterns?", type: "aptitude" },
  { id: 7, question: "Are you interested in teaching or mentoring others?", type: "interest" },
  { id: 8, question: "Do you enjoy drawing, designing, or music?", type: "interest" },
  { id: 9, question: "Would you prefer working in a business/office environment?", type: "interest" },
  { id: 10, question: "Do you like problem-solving using technology?", type: "aptitude" },
];

// Logic to suggest careers
function getSuggestion(answers) {
  let score = {
    engineering: 0,
    medicine: 0,
    arts: 0,
    commerce: 0,
    teaching: 0,
  };

  if (answers["1"] === "yes") score.engineering++;
  if (answers["2"] === "yes") score.engineering++;
  if (answers["4"] === "yes") score.medicine++;
  if (answers["5"] === "yes") score.medicine++;
  if (answers["3"] === "yes") score.arts++;
  if (answers["8"] === "yes") score.arts++;
  if (answers["6"] === "yes") score.commerce++;
  if (answers["9"] === "yes") score.commerce++;
  if (answers["7"] === "yes") score.teaching++;
  if (answers["10"] === "yes") score.engineering++;

  // Find best scoring path
  let suggestion = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);

  // Map to career names
  const paths = {
    engineering: "Engineering & Technology (Software, Civil, Mechanical, IT)",
    medicine: "Medicine & Healthcare (Doctor, Nurse, Pharmacist)",
    arts: "Arts & Humanities (Designer, Writer, Media, Fine Arts)",
    commerce: "Commerce & Business (Finance, Accounting, Management)",
    teaching: "Education & Teaching (School Teacher, Lecturer, Research)",
  };

  return paths[suggestion];
}

// Routes
router.get("/questions", (req, res) => {
  res.json(questions);
});

router.post("/submit", (req, res) => {
  const { answers } = req.body;
  const suggestion = getSuggestion(answers);
  res.json({ suggestion });
});

module.exports = router;
