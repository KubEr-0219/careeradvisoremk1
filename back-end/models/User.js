// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional: only needed if you’re doing password login
  savedResults: [
    { type: mongoose.Schema.Types.ObjectId, ref: "QuizResult" }
  ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
