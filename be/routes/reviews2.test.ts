import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {});
  });

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("should return 200 if movie doesn't exist in db", async () => {
    const testData = {
      title: "KOKAIN MACI 4",
      id: 1234577,
      poster_path: "KEP.jpg",
      adult: true,
      review: {
        reviewer: "Mikorka Kálmán",
        text: "egy szar",
      },
    }
    const response = await supertest(app).post("/api/reviews").send(testData) // ! a db logika az igaziban van, hogy váltjuk ki az in-memoryval?
    expect(response.status).toBe(200)

})
it("should return 200 if movie doesn't exist in db", async () => {
  const testData = {
    title: "KOKAIN MACI 4",
    id: 1234577,
    poster_path: "KEP.jpg",
    adult: true,
    review: {
      reviewer: "Mikorka Kálmán",
      text: "egy szar",
    },
  }
  const response = await supertest(app).post("/api/reviews").send(testData) // ! a db logika az igaziban van, hogy váltjuk ki az in-memoryval?
  expect(response.status).toBe(200)

})