import express, { Express, Request, Response } from "express";
import { z } from "zod";
import {Movie, type RevMovieType} from "../models/movies"
import { verify } from "../middleWares/verify";
import { safeParseFc } from "../utilities/safeParseFc";

const router = express.Router();

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


router.post('/', verify(revZodSchema), async (req: Request, res: Response) =>{
    const result = req.body as revZodSchemaType
    const movie = await Movie.findOne({id: result.id})
    if(!movie){
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
    
    await Movie.findOneAndUpdate({id: result.id}, {$push: {reviews:[result.review]}})
    res.sendStatus(200)
})

router.get('/movies', verify(findMovieSchema), async (req: Request, res: Response)=>{
    const result = req.body.id as number
    try{
        const movie = await Movie.findOne({id: result})
        return res.json(movie)
    } catch(err: any){
        console.log(err.message);
    }
})
router.get('/reviewer', verify(findReviewerSchema), async (req: Request, res: Response)=>{
    const result = req.body.name as string
    try{
        const movie = await Movie.find({"reviews.reviewer": result})
        return res.json(movie)
    } catch(err: any){
        console.log(err.message);
    }
})




export default router