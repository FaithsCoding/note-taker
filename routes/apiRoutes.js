// Dependencies
const path = require("path");
const fs = require("fs");

// Node package allowing IDs to have unique names
const uniqid = require("uniqid");

// Beginning of the routing
module.exports = (app) => {
  // GET request asking the api/notes to read the db.json file and return saved notes as JSON
  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "db", "db.json"));
  });

  // POST request asking the api/notes to receive a new note to save which gets added to the db.json file and returns a new note for the user
  app.post("/api/notes", (req, res) => {
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);

    // Body for the notes
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      // Using uniqid to create an ID which is specified
      id: uniqid(),
    };

    // PUSH the new note into the db.json file
    db.push(userNote);
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    res.json(db);
  });

  // DELETE request providing a parameter for /api/notes:id containing the ID of the note to delete
  app.delete("/api/notes/:id", (req, res) => {
    // This let reads the notes from the db.json
    let db = JSON.parse(fs.readFileSync("db/db.json"));
    // Picks out the ID and removes it
    let deleteNotes = db.filter((item) => item.id !== req.params.id);
    // Rewriting the note to db.json
    fs.writeFileSync("db/db.json", JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  });
};
