// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function protect(req, res, next) {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // remove "Bearer "
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  res.status(401).json({ error: "Not authorized, no token" });
}

module.exports = protect;
