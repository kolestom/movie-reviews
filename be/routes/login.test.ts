import app from "../app"
import supertest from "supertest"
import dotenv from "dotenv";

dotenv.config()
// dotenv.config({
//     path: '../.env.test'
// });

const request = supertest(app);



it("gets the test endpoint", async () => {
    const response = await request.post("/api/login")
 
    expect(response.status).toBe(400);
    // expect(response.body.message).toBe("pass!");

  });
  