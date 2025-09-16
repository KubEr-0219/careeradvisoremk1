// backend/routes/quizRoute.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const QuizResult = require("../models/QuizResult");
const User = require("../models/User");

// ----------------------
// Questions (served by API)
// ----------------------
const questions = [
  { id: 1, q: "Do you enjoy solving math problems?", type: "aptitude" },
  { id: 2, q: "Do you like working with computers?", type: "interest" },
  { id: 3, q: "Are you more comfortable with creative tasks (art, writing)?", type: "interest" },
  { id: 4, q: "Do you enjoy conducting science experiments?", type: "aptitude" },
  { id: 5, q: "Would you like to help sick people get better?", type: "interest" },
  { id: 6, q: "Do you like analyzing data and patterns?", type: "aptitude" },
  { id: 7, q: "Are you interested in teaching or mentoring others?", type: "interest" },
  { id: 8, q: "Do you enjoy drawing, designing, or music?", type: "interest" },
  { id: 9, q: "Would you prefer working in a business/office environment?", type: "interest" },
  { id: 10, q: "Do you like problem-solving using technology?", type: "aptitude" }
];

// GET /api/quiz/questions
router.get("/questions", (req, res) => res.json(questions));

// ----------------------
// Helper: compute career suggestion
// ----------------------
function computeSuggestion(answers) {
  let score = { engineering: 0, medicine: 0, arts: 0, commerce: 0, teaching: 0 };

  if (answers[1] === "yes") score.engineering++;
  if (answers[2] === "yes") score.engineering++;
  if (answers[4] === "yes") score.medicine++;
  if (answers[5] === "yes") score.medicine++;
  if (answers[3] === "yes") score.arts++;
  if (answers[8] === "yes") score.arts++;
  if (answers[6] === "yes") score.commerce++;
  if (answers[9] === "yes") score.commerce++;
  if (answers[7] === "yes") score.teaching++;
  if (answers[10] === "yes") score.engineering++;

  let best = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  const paths = {
    engineering: "Engineering & Technology",
    medicine: "Medicine & Healthcare",
    arts: "Arts & Humanities",
    commerce: "Commerce & Business",
    teaching: "Education & Teaching"
  };
  const summary = `Based on your answers you match ${paths[best]}.`;
  return { suggestion: paths[best], summary, scores: score };
}

// ----------------------
// POST /api/quiz/submit
// ----------------------
router.post("/submit", async (req, res) => {
  try {
    const { answers = {}, userEmail } = req.body;

    // Try to decode token (if provided)
    let userId = null;
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      try {
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        if (decoded && decoded.id) userId = decoded.id;
      } catch (err) {
        console.warn("Invalid token, continuing without userId");
      }
    }

    // Compute suggestion
    const resultData = computeSuggestion(answers);

    // Save quiz result
    const newResult = await QuizResult.create({
      user: userId || undefined,
      userEmail: userEmail || undefined,
      answers,
      suggestion: resultData.suggestion,
      summary: resultData.summary,
      scores: resultData.scores
    });

    // Link result to user (by id or by email)
    if (userId) {
      await User.findByIdAndUpdate(userId, { $push: { savedResults: newResult._id } });
    } else if (userEmail) {
      const user = await User.findOne({ email: userEmail });
      if (user) {
        await User.findByIdAndUpdate(user._id, { $push: { savedResults: newResult._id } });
      }
    }

    res.json({
      result: newResult,
      suggestion: resultData.suggestion,
      summary: resultData.summary
    });
  } catch (err) {
    console.error("Error submitting quiz:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET /api/quiz/result/:id
// ----------------------
router.get("/result/:id", async (req, res) => {
  try {
    const r = await QuizResult.findById(req.params.id).populate("user", "name email");
    res.json(r || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET /api/quiz/user/:email
// ----------------------
router.get("/user/:email", async (req, res) => {
  try {
    const list = await QuizResult.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
