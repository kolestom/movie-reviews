import { useEffect, useState } from "react";
import axios from "axios";
import Review from "./Review";
const MovieDrawer = ({onClose, movie}) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

    useEffect(()=>{
        const getMovie = async () => {
            const data = await axios.get(`http://localhost:3004/api/reviews/movies?id=${movie.id}`)
            
            setReviews(data.data.reviews)
        }
        getMovie()
    },[])

    const saveHandler = async() => {
        const response = await axios.post('http://localhost:3004/api/reviews', {
            
                title: movie.title,
                id: movie.id,
                poster_path: movie.poster_path,
                adult: movie.adult,
                review: {
                    reviewer: localStorage.getItem('user'),
                    text: newReview,
                }
            })
            console.log("review iras sikeres-e",response.data)
    }
    return ( 
        <>
        {reviews.length>0 && reviews.map((review, i) => <Review key={i}{...{review}}/>)}
        <input type="text" value={newReview} placeholder='Write new review'onInput={(e)=>setNewReview(e.target.value)}/>
        <button onClick={saveHandler}>Save review</button>
        <button onClick={onClose}>Close Drawer</button>
        </>
     );
}
 
export default MovieDrawer;