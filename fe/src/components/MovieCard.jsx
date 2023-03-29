import React from 'react'
import styles from './MovieCard.module.css'

function MovieCard({movie}) {
    console.log(movie)
  return (
    <div className={styles.card}>
        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="" />
        <div>{movie.vote_average}</div>
        <h4>{movie.title}</h4>
        <p>{movie.release_date}</p>
        
    </div>
  )
}

export default MovieCard