import app from "../app";
import supertest from "supertest";
import dotenv from "dotenv";

dotenv.config();
// dotenv.config({
//     path: '../.env.test'
// });

const request = supertest(app);

describe("testing the review POST endpoint", () => {
  it("should return 201 status if the testData exists", async () => {
    //given
    const testData = {
      title: "KOKAIN MACI",
      id: 12345,
      poster_path: "KEP.jpg",
      adult: true,
      review: {
        reviewer: "Mikorka Kálmán",
        text: "egy szar",
      },
    };

    //when
    const response = await request.post("/api/reviews").send(testData);

    //then
    expect(response.status).toBe(201);
    // expect(response.body.message).toBe("pass!");
  });
});


describe("testing the review GET endpoints", () => {
  it("should return 201 status if the testData exists", async () => {
    //given

    //when
    const response = await request.get("/api/reviews/movie");

    //then
    expect(response.status).toBe(201);
    // expect(response.body.message).toBe("pass!");
  });
  it("should return 201 status if the testData exists", async () => {
    //given
    //when
    const response = await request.get("/api/reviews/reviewer");

    //then
    expect(response.status).toBe(201);
    // expect(response.body.message).toBe("pass!");
  });
});
