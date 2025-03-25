const express = require("express");

const app = express();

app.get("/api/message", (req, res) => {
  res.json({ message: "Hi i am the boss" });
});

module.exports = app;
