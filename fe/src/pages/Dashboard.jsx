import { useEffect,useState } from 'react';
import {getMovies} from '../api/getMovies'
import MovieCard from '../components/MovieCard';
import styles from './Dashboard.module.css'

const Dashboard = () => {

    const [topMovies, setTopMovies] = useState([]);

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
            {topMovies.length>0 && topMovies.map(movie =>{
            return  <MovieCard key={movie.id} {...{movie}} />
            })}
        </div>
        </div>
     );
}
 
export default Dashboard;