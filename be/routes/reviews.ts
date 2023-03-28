import express, { Express, Request, Response } from "express"
import { z } from "zod"
import { Movie, type RevMovieType } from "../models/movies"
import { verify } from "../middleWares/verify"
import { safeParseFc } from "../utilities/safeParseFc"

const router = express.Router()

const revZodSchema = z.object({
    title: z.string(),
    id: z.number(),
    poster_path: z.string(),
    adult: z.boolean(),
    review: z.object({
        reviewer: z.string(), // name
        text: z.string(),
    })
})
type revZodSchemaType = z.infer<typeof revZodSchema>

const findMovieSchema = z.number()
const findReviewerSchema = z.string()


router.post('/', verify(revZodSchema), async (req: Request, res: Response) => {
    const result = req.body as revZodSchemaType
    const movie = await Movie.findOne({ id: result.id }) as RevMovieType | null
    if (!movie) {
        await Movie.create({
            title: result.title,
            id: result.id,
            poster_path: result.poster_path,
            adult: result.adult,
            reviews: [
                result.review
            ]
        }) as RevMovieType
        return res.sendStatus(200)
    }

    await Movie.findOneAndUpdate({ id: result.id }, { $push: { reviews: [result.review] } })
    res.sendStatus(201)
})

router.get('/movies', async (req: Request, res: Response) => {
    if (req.query.id) {
        const id = parseInt(req.query.id as string)
        if(!id) return res.sendStatus(400)

        const movie = await Movie.findOne({ id })
        if (!movie) return res.sendStatus(404)
        res.json(movie)
    }
})

// router.get('/reviewer', verify(findReviewerSchema), async (req: Request, res: Response) => {
//     const result = req.body.name as string
//     const movie = await Movie.find({ "reviews.reviewer": result })
//     if (!movie.length) return res.sendStatus(404)
//     res.json(movie)
// })
router.get('/reviewer', async (req: Request, res: Response) => {
    if (req.query.name) {
        const name = req.query.name

        const movies = await Movie.find({ "reviews.reviewer": name })
        if (!movies.length) return res.sendStatus(404)
        res.json(movies)
    }
})


export default router