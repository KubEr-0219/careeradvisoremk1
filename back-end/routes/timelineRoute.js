const express = require("express");
const router = express.Router();
const TimelineEvent = require("../models/TimelineEvent");

const seed = async () => {
  const c = await TimelineEvent.countDocuments();
  if(c===0) await TimelineEvent.insertMany([
    { title:"UG Admission Window", description:"Apply to colleges", startDate: new Date("2025-06-01"), endDate:new Date("2025-07-15"), tags:["admission"] },
    { title:"State Scholarship - Phase 1", description:"Apply online", startDate: new Date("2025-05-10"), endDate:new Date("2025-06-30"), tags:["scholarship"] }
  ]);
};
seed();

router.get("/", async (req,res)=>{
  const all = await TimelineEvent.find().sort({startDate:1});
  res.json(all);
});

module.exports = router;