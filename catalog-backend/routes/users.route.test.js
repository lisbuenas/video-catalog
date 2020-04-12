const request = require("supertest");
const app = require("../server");

describe("User Endpoints", () => {
  it("Should add a new user", async () => {
    const res = await request(app).post("/users/register").send({
      Title: "Title Test",
      Genre: "Genre test",
      Released: "20/20/2000",
      Actors: "Actor test",
      youtubeTrailer: "youtube url",
      Poster: "Image",
      imdbRating: "7.2",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("Should login", async () => {
    const res = await request(app).post("/users/authenticate").send({
      email: "",
      password: "",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("Should not login (wrong credentials)", async () => {
    const res = await request(app).post("/users/authenticate").send({
      email: "",
      password: "",
    });
    expect(res.statusCode).toEqual(500);
  });
});
