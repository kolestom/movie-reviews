import app from "../app"
import supertest from "supertest"
import dotenv from "dotenv"
import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from "mongodb-memory-server"

dotenv.config()
// dotenv.config({
//     path: '../.env.test'
// })

const request = supertest(app)

describe('Testing the /reviews/review endpoint', () => {
  let con: MongoClient
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    con = await MongoClient.connect(mongoServer.getUri(), {})
  })

  afterAll(async () => {
    if (con) {
      await con.close()
    }
    if (mongoServer) {
      await mongoServer.stop()
    }
  })

  it("should return 200 if movie doesn't exist in db", async () => {

    const db = con.db(mongoServer.instanceInfo!.dbName)

    expect(db).toBeDefined()
    const col = db.collection('test')

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
    }

    //when
    const response = await request.post("/api/reviews").send(testData) // ! a db logika az igaziban van, hogy váltjuk ki az in-memoryval?

    //then
    expect(response.status).toBe(200)
  })

  it("should return 200 if movie exists in db", async () => {
    //given
    const testData = {
      title: "KOKAIN MACI 3",
      id: 696969,
      poster_path: "KEP.jpg",
      adult: true,
      review: {
        reviewer: "Mikorka Kálmán",
        text: "egy nagy szar",
      },
    }

    //when
    const response = await request.post("/api/reviews").send(testData)

    //then
    expect(response.status).toBe(200)
  })

  it("should return 400 if we don't send a number", async () => {
    //given
    const testData = "string"

    //when
    const response = await request.get("/api/reviews/movies")

    //then
    expect(response.status).toBe(400)
  })
})







// describe("testing the review GET endpoints", () => {
//   it("should return 201 status if the movie exists", async () => {
//     //given
//     const movie = 1234

//     //when
//     const response = await request.get("/api/reviews/movie")

//     //then
//     expect(response.status).toBe(201)
//     // expect(response.body.message).toBe("pass!")
//   })

//   it("should return 201 status if the testData exists", async () => {
//     //given
//     //when
//     const response = await request.get("/api/reviews/reviewer")

//     //then
//     expect(response.status).toBe(201)
//     // expect(response.body.message).toBe("pass!")
//   })
// })
