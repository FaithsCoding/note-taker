const server = require("./server");
const request = `http://localhost:${4000}`;

describe("Test the note taking app routes", () => {
  // Test the GET /notes endpoint
  it("should respond with status code 200 and return notes.html", async () => {
    const response = await request(app).get("/notes");
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual("text/html");
  });

  // Test the GET /api/notes endpoint
  it("should respond with status code 200 and return an array of notes", async () => {
    const response = await request(app).get("/api/notes");
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual("application/json");
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test the POST /api/notes endpoint
  it("should respond with status code 200 and return the added note", async () => {
    const note = {
      title: "Test Note",
      text: "This is a test note.",
    };
    const response = await request(app).post("/api/notes").send(note);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.title).toEqual(note.title);
    expect(response.body.text).toEqual(note.text);
  });

  // Test the DELETE /api/notes/:id endpoint
  it("should respond with status code 200 and return an array of notes without the deleted note", async () => {
    const noteToDelete = {
      title: "Test Note",
      text: "This is a test note.",
    };
    const noteToAdd = {
      title: "Another Test Note",
      text: "This is another test note.",
    };
    // First add a note to the list
    const addedNoteResponse = await request(app)
      .post("/api/notes")
      .send(noteToAdd);
    const addedNote = addedNoteResponse.body;

    // Then add a note to delete
    const noteToDeleteResponse = await request(app)
      .post("/api/notes")
      .send(noteToDelete);
    const noteToDeleteId = noteToDeleteResponse.body.id;

    // Then delete the note
    const response = await request(app).delete(`/api/notes/${noteToDeleteId}`);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual("application/json");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).not.toContainEqual(noteToDelete);
    expect(response.body).toContainEqual(addedNote);
  });
});
