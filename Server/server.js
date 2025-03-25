const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS to allow frontend requests
app.use(express.json()); // Middleware to parse JSON data

// Sample API endpoint
app.get("/api/message", (req, res) => {
  res.json({ message: "Hi I am the boss" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
