//dependencies
const path = require('path');
const fs = require('fs')

//node package allowing id's to have unique names
var uniqid = require('uniqid');

//begining of the routing
module.exports = (app) => {
    //GET request asking the api/notes read the db.json file and return saved notes as JSON
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '..db/db.json'));
    });

    //POST request asking the api/notes receives a new note to save which gets added to the db.json file and returns a new note for the user
    app,post('/api/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        res.json(db);
        
        //body for the notes
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            // using uniqid to create an id which is specified
            id: uniqid(),
        };
        // PUSH the new note into the db.json file
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db;);
    });
}
