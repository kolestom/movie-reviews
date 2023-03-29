import React from 'react'
import styles from './MovieCard.module.css'
import { useNavigate, Link } from "react-router-dom"


function MovieCard({ movie }) {

  // const navigate = useNavigate()


  return (
    <Link to={`filmek/${movie.title}`}>
      <div className={styles.card}>
        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="" />
        <div>{movie.vote_average}</div>
        <h4>{movie.title}</h4>
        <p>{movie.release_date}</p>
      </div>
    </Link>
  )
}

export default MovieCard