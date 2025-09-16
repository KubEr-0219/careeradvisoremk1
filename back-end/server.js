const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const testRoute = require("./routes/testRoute");
app.use("/api", testRoute);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const quizRoute = require("./routes/quizRoute");
app.use("/api/quiz", quizRoute);

const roadmapRoute = require("./routes/roadmapRoute");
app.use("/api/roadmap", roadmapRoute);
