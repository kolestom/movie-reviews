import { useEffect,useState } from 'react';
import {getMovies} from '../api/getMovies'
import MovieCard from '../components/MovieCard';
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {

    const [topMovies, setTopMovies] = useState([]);
    const [isLoggedIn] = useOutletContext()

    useEffect(()=>{
        const init = async()=>{
            const result = await getMovies()
            setTopMovies(result)
        }
        init()
    },[])
    return ( 
        <div className={styles.mainDiv}>
        <div className={styles.container}>
            {topMovies.length>0 && topMovies.map(movie =>(

               <MovieCard key={movie.id}{...{movie, isLoggedIn}} />
            )
            )}
        </div>
        </div>
     );
}
 
export default Dashboard;