//dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

//asks express to create a route for every file in the public folder and use the '/' route.
app.use(express.static("public"));
//sets up express app to handle the parsing data e.g middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route files
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//route to read db.json and return saved notes as JSON
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//route to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//receieve a new note and add it to the db.json file and return the saved note
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteLength = noteList.length + 1;

  //creates new id for the property basedd on length and assigns it to the object
  newNote.id = noteLength;
  //pushes new note
  noteList.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

//deletes notes using their id
app.delete("/api/notes/:id", (req, res) => {
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteId = req.params.id.toString();

  //creates an array which filters by id and deletes accordingly.
  noteList = noteList.filter((selected) => {
    return selected.id != noteId;
  });

  //updates db.json and returns the updated note
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

//starts the server, also known as an app listener
app.listen(PORT, () => {
  console.log(`Your server is available at http://localhost:${PORT}`);
});
