const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow CORS for frontend-backend communication
app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Vercel backend!" });
});

// Export for Vercel (No app.listen())
module.exports = app;
