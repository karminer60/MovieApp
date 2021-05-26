import React from 'react'

import MovieCard from './MovieCard.js'

//passing state through props from App
export default function MovieList({movies}){
   
    return(
        <div className="movie-list">
        {
            movies.map(movie => (
            <a href={movie.url}>
                <MovieCard movie={movie} />
            </a>
            ))
        } 
        </div>
    )
}
