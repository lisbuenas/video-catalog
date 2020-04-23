const request = require("supertest");
const app = require("../server");

const faker = require("faker");

describe("User Endpoints", () => {
  it("Should add a new user", async () => {
    const res = await request(app).post("/users/register").send({
      email: faker.internet.email(),
      password: "123456",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("Should FAIL add a new user(duplicated)", async () => {
    const res = await request(app).post("/users/register").send({
      email: "fe.lisboa@yahoo.com.br",
      password: "123456",
    });
    expect(res.statusCode).toEqual(409);
  });

  it("Should login", async () => {
    const res = await request(app).post("/users/authenticate").send({
      email: "fe.lisboa@yahoo.com.br",
      password: "123456",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("Should not login (wrong credentials)", async () => {
    const res = await request(app).post("/users/authenticate").send({
      email: "",
      password: "",
    });
    expect(res.statusCode).toEqual(418);
  });
});
