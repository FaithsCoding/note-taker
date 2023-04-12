const app = require("./server");
const request = require("supertest");

describe("GET routes", () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  it("should return the notes HTML file when GET /notes is called", async () => {
    const response = await request(server).get("/notes");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
  });

  it("should return the index HTML file when GET / is called", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
  });

  it("should return an array of notes when GET /api/notes is called", async () => {
    const response = await request(server).get("/api/notes");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
