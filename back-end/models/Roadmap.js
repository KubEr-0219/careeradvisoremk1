const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoadmapSchema = new Schema({
  key: { type: String, required: true, unique: true }, // like "engineering"
  title: { type: String, required: true },
  description: { type: String, required: true },
  steps: [
    {
      stage: String,  // "High School", "Degree", "Jobs"
      details: String // description of what to do at this stage
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model("Roadmap", RoadmapSchema);
