import React, {useState} from 'react'

/*- Year
  - Rating
  - Runtime
  - Votes
  - Genres */


//passing state through props from App
export default function MovieList(props){
    const {movies} = props; 
    const [searchValue, setSearchValue] = useState('');

    const onChangeHandler = e => {
        setSearchValue(e.target.value.toLowerCase())
    }

    const filtered = movies === null ? null : movies.filter(movie => movie.title.toLowerCase().includes(searchValue))
  
    //state in input changed through onChange event and onChangeHandler, event.target.value has what it is changed to; input is a controlled component
    return(
        <>
            <div className="search-bar">
                <input
                type="text"
                onChange={onChangeHandler}
                name="searchValue"
                value={searchValue}
                placeholder="Filter titles"
                id="searchBar"
                />
            </div>
        
        <table className="movie-list">

            

            <tr>
                <th>Image</th> 
                <th>Title</th> 
                <th>Year</th>
                <th>Rating</th> 
                <th>Runtime</th> 
                <th>Votes</th> 
                <th>Genres</th>
            </tr>
        {   //conditional (ternary expression) in case movies are not loaded yet
            filtered === null ? <tr><td>Loading data...</td></tr> :
            filtered.length === 0 ? <tr><td>No records match your search.</td></tr> :
            filtered.map(movie => (
            <tr>
                <td>
                    <img src={movie.imageUrl} />
                    
                </td>
                <td>
                    <a href={movie.url}>
                        <h2>{movie.title}</h2>
                    </a>

                    <p>
                        {movie.description}
                    </p>
                </td>

                <td>
                    <p>{movie.year}</p> 
                    
                </td>

                <td>
                    <p>{movie.rating}</p> 
                    
                </td>

                <td>
                    <p>{movie.runtime}</p> 
                    
                </td>

                <td>
                    <p>{movie.votes}</p> 
                    
                </td>

                <td>
                    <p>{movie.genres}</p> 
                    
                </td>

            </tr>
            ))
        } 
        </table>
        </>
    )
}
