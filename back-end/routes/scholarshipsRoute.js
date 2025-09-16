const express = require("express");
const router = express.Router();
const Scholarship = require("../models/Scholarship");

const seed = async () => {
  const c = await Scholarship.countDocuments();
  if(c===0) await Scholarship.insertMany([
    { title:"Merit Scholarship 2025", provider:"State Govt", description:"For meritorious students", deadline: new Date("2025-08-15"), link:"https://example.com/apply", eligibility:"Class 12 passed" }
  ]);
};
seed();

router.get("/", async (req,res)=>{
  const list = await Scholarship.find().sort({deadline:1});
  res.json(list);
});

module.exports = router;