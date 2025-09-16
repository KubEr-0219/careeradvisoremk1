const express = require("express");
const router = express.Router();
const College = require("../models/College");

// sample seed
const sample = [
  { name: "Govt Degree College A", district: "District X", state: "State Y", courses:["B.Sc","B.A"], facilities:["Hostel","Library"], contact:"011-1234", location:{lat:26.9,lng:75.8} },
  { name: "Govt Degree College B", district: "District Y", state: "State Y", courses:["B.Com","BBA"], facilities:["Labs","Internet"], contact:"011-5678", location:{lat:26.8,lng:75.9} }
];

const seed = async ()=>{
  const c = await College.countDocuments();
  if(c===0) await College.insertMany(sample);
};
seed();

router.get("/", async (req,res)=>{
  const q = req.query.q;
  const filter = q ? { name: new RegExp(q, 'i') } : {};
  const list = await College.find(filter).limit(100);
  res.json(list);
});

module.exports = router;