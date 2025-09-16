// backend/models/QuizResult.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: false }, // link to logged-in user
  userEmail: { type: String, required: false }, // fallback if no login
  answers: { type: Object, required: true }, // user answers {id: "yes"/"no"}
  suggestion: { type: String },
  summary: { type: String },
  scores: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model("QuizResult", QuizResultSchema);
