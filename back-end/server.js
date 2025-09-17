// backend/server.js
// Full-featured Express server for your project.
// Uses .env for configuration, connects to MongoDB, mounts API routes,
// serves frontend build in production, and includes basic logging + error handling.

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// ---------- Configuration ----------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/your-db-name";

// ---------- Middleware ----------
app.use(cors({
  origin: process.env.CORS_ORIGIN || true, // set to frontend URL in production (e.g. https://yourdomain.com)
  credentials: true
}));
app.use(express.json()); // body parser for JSON
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(morgan("dev")); // request logging (dev)

// ---------- Import & mount API routes ----------
// Make sure these files exist in backend/routes/vs
const quizRoute = require("./routes/quizRoute");
const usersRoute = require("./routes/usersRoute");
const roadmapsRoute = require("./routes/roadmapsRoute");
const collegesRoute = require("./routes/collegesRoute");
const timelineRoute = require("./routes/timelineRoute");
const scholarshipsRoute = require("./routes/scholarshipsRoute");

// Mounting with base prefixes
app.use("/api/quiz", quizRoute);
app.use("/api/users", usersRoute);
app.use("/api/roadmaps", roadmapsRoute);
app.use("/api/colleges", collegesRoute);
app.use("/api/timeline", timelineRoute);
app.use("/api/scholarships", scholarshipsRoute);

// ---------- Health check and simple routes ----------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ---------- Serve React frontend in production (optional) ----------
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "..", "front-end", "build"); // adjust if your build path differs
  app.use(express.static(clientBuildPath));

  // All other requests -> serve index.html (SPA fallback)
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// ---------- Error handling middleware ----------
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // simple error handler that returns JSON
  console.error(err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error"
    }
  });
});

// ---------- Start server after DB connect ----------
async function start() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    // Start express
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || "development"})`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

// ---------- Graceful shutdown ----------
process.on("SIGINT", async () => {
  console.log("SIGINT received — closing MongoDB connection and exiting");
  await mongoose.disconnect();
  process.exit(0);
});
