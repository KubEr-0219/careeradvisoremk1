// backend/seedRoadmaps.js
const mongoose = require("mongoose");
require("dotenv").config();
const Roadmap = require("./models/Roadmap");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/your-db-name";

const data = [
  {
    key: "engineering",
    title: "Engineering & Technology",
    description: "Pathway for students interested in problem-solving, computers, and innovation.",
    steps: [
      { stage: "After Class 10", details: "Choose Science (PCM). Build strong math + physics skills." },
      { stage: "After Class 12", details: "Appear for JEE, state entrance exams or apply to government engineering colleges." },
      { stage: "During Degree", details: "Focus on internships, coding, robotics, or electronics projects." },
      { stage: "After Graduation", details: "Careers in software, civil, mechanical, electronics, AI, or higher studies (M.Tech, MBA)." }
    ]
  },
  {
    key: "medicine",
    title: "Medicine & Healthcare",
    description: "For students who want to become doctors, nurses, or healthcare professionals.",
    steps: [
      { stage: "After Class 10", details: "Choose Science with Biology (PCB)." },
      { stage: "After Class 12", details: "Appear for NEET or relevant entrance exams." },
      { stage: "During MBBS/BDS/Nursing", details: "Focus on clinical exposure, practicals, and internships." },
      { stage: "After Graduation", details: "Specialize via MD/MS or work in hospitals, research, or public health." }
    ]
  },
  {
    key: "arts",
    title: "Arts & Humanities",
    description: "For creative and analytical thinkers pursuing social sciences, languages, and arts.",
    steps: [
      { stage: "After Class 10", details: "Choose Arts stream (History, Political Science, Sociology, etc.)." },
      { stage: "After Class 12", details: "Enroll in BA, Journalism, Fine Arts, or similar degrees." },
      { stage: "During Degree", details: "Work on writing, debates, internships in NGOs or media." },
      { stage: "After Graduation", details: "Careers in civil services, law, media, research, or creative industries." }
    ]
  },
  {
    key: "commerce",
    title: "Commerce & Business",
    description: "For students interested in business, finance, and economics.",
    steps: [
      { stage: "After Class 10", details: "Choose Commerce with Maths/Without Maths." },
      { stage: "After Class 12", details: "Pursue B.Com, BBA, or Economics Honours." },
      { stage: "During Degree", details: "Focus on finance, accounting, stock markets, or entrepreneurship projects." },
      { stage: "After Graduation", details: "Careers in CA, MBA, banking, consulting, or starting your own business." }
    ]
  },
  {
    key: "teaching",
    title: "Education & Teaching",
    description: "For students passionate about teaching and mentoring others.",
    steps: [
      { stage: "After Class 10", details: "Choose any stream but build strong communication skills." },
      { stage: "After Class 12", details: "Enroll in BA/B.Sc + B.Ed integrated courses or pursue graduation first." },
      { stage: "During Degree", details: "Do internships in schools, tutoring, and practice teaching." },
      { stage: "After Graduation", details: "Work as a school/college teacher or pursue M.Ed/PhD for higher education." }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to DB");

    await Roadmap.deleteMany({});
    console.log("🗑️ Old roadmaps removed");

    await Roadmap.insertMany(data);
    console.log("🎉 Sample roadmaps added");

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
