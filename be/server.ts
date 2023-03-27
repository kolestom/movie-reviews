import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import { env } from './utilities/envParser';
import login from './routes/login'
import reviews from './routes/reviews'
import mongoose from 'mongoose';
import cors from 'cors'

const app: Express = express();

app.use(cors())
app.use(express.json());
app.use('/api/login', login)
app.use('/api/reviews', reviews)


mongoose.connect(env.MONGO_URL)
.then(()=>{
  console.log('MongoDB is on');
  app.listen(env.PORT, () => console.log(`Server running at port ${env.PORT} for Movie reviews`)) 
})
.catch((err: unknown) =>{
  console.log('MongoDB connection error: ', err);
})