// Dependencies
const path = require("path");
const app = require("express").Router();

// GET request which returns notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// GET request to return index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
