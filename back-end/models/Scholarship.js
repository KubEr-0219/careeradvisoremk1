const mongoose = require("mongoose");

const ScholarshipSchema = new mongoose.Schema({
  title: String,
  provider: String,
  description: String,
  deadline: Date,
  link: String,
  eligibility: String
});

module.exports = mongoose.model("Scholarship", ScholarshipSchema);