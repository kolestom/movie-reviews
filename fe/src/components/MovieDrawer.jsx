import { useEffect, useState } from "react";
import axios from "axios";
import Review from "./Review";
import styles from "./MovieDrawer.module.css"


const MovieDrawer = ({onClose, movie, isLoggedIn}) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

    useEffect(()=>{
        const getMovie = async () => {
            const data = await axios.get(`http://localhost:3004/api/reviews/movies?id=${movie.id}`)
            
            setReviews(data.data.reviews)
        }
        getMovie()
    },[])
    // const handleInput = (e) => {
        
    //     newReview.length>1 ? setIsDisabled(true) : setIsDisabled(false)
    // }
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
            setNewReview('')
            console.log("review iras sikeres-e",response.data)
    }
    return (
      <>
      <div className={styles.oldReviews}>

        {reviews.length > 0 &&
          reviews.map((review, i) => <Review key={i} {...{ review }} />)}
      </div>
        {isLoggedIn && (
          <input
            type="text"
            value={newReview}
            placeholder="Write a review"
            onInput={(e) => setNewReview(e.target.value)}
          />
        )}
        {isLoggedIn && <button disabled={newReview.length>1 ? false : true} onClick={saveHandler}>Save review</button>}
        <button onClick={onClose}>Close Drawer</button>
      </>
    );
}
 
export default MovieDrawer;