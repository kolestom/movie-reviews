import request from 'supertest';
import {
  connect,
  cleanData,
  disconnect
} from '../mongodbMemoryServer/mongodb.memory.test.helper';
import app from '../app';

describe('Name Target Controller', () => {
  beforeAll(connect);
  beforeEach(cleanData);
  afterAll(disconnect);

  it("should return 200 if movie doesn't exist in db", async () => {
    const testData = {
      title: "KOKAIN MACI 4",
      id: 12345,
      poster_path: "KEP.jpg",
      adult: true,
      release_date: "2022-12-12",
      overview: "Awesome movie description",
      vote_average: 8,
      review: {
        reviewer: "Mikorka Kálmán",
        text: "egy szar",
      },
    }
    const response = await request(app).post("/api/reviews").send(testData) 
    expect(response.status).toBe(200)

})
it("should return 200 if movie doesn't exist in db", async () => {
  const testData = {
    title: "KOKAIN MACI 4",
    id: 12345,
    poster_path: "KEP.jpg",
    adult: true,
    release_date: "2022-12-12",
    overview: "Awesome movie description",
    vote_average: 8,
    review: {
      reviewer: "Mikorka Kálmán",
      text: "egy szar",
    },
  }
  const response = await request(app).post("/api/reviews").send(testData) 
  expect(response.status).toBe(200)

})
})
