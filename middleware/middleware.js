const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Middleware for parsing urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Your routes and other middleware go here
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
