import mongoose from "mongoose";
import { Schema , InferSchemaType} from "mongoose";

const revMovieSchema = new Schema({
    title: String,
    id: Number, //  id from API
    poster_path: String,
    adult: Boolean,
    reviews: [
        {
            reviewer: String, // name
            text: String,
            // rating: Number
        }
    ]
})

export type RevMovieType = InferSchemaType<typeof revMovieSchema>
export const Movie = mongoose.model('Review', revMovieSchema)