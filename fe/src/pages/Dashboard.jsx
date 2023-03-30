import { useEffect,useState } from 'react';
import {getMovies} from '../api/getMovies'
import MovieCard from '../components/MovieCard';
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {

    
    const [isLoggedIn, setIsLoggedIn, movieList, setMovieList] = useOutletContext()

    
    return ( 
        <div className={styles.mainDiv}>
        <div className={styles.container}>
            {movieList.length>0 && movieList.map(movie =>(

               <MovieCard key={movie.id}{...{movie, isLoggedIn}} />
            )
            )}
        </div>
        </div>
     );
}
 
export default Dashboard;