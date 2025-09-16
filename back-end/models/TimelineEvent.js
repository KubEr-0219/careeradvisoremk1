const mongoose = require("mongoose");

const TimelineEventSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  tags: [String]
});

module.exports = mongoose.model("TimelineEvent", TimelineEventSchema);