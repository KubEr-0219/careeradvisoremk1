const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
  name: String,
  district: String,
  state: String,
  courses: [String],
  facilities: [String],
  contact: String,
  location: { lat: Number, lng: Number } // optional
});

module.exports = mongoose.model("College", CollegeSchema);