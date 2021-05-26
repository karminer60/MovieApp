import React, { useState } from 'react'


/*- Year
  - Rating
  - Runtime
  - Votes
  - Genres */


//passing state through props from App
export default function MovieList(props) {
    const { movies } = props;
    const [searchValue, setSearchValue] = useState('');

    const onChangeHandler = e => {
        setSearchValue(e.target.value.toLowerCase())
    }
    //filtered variable checks for no movies list, else filters for searchValue set in onChangeHandler through user input event
    //filtered variable is made available to provide 'no results message' in return
    const filtered = movies === null ? null : movies.filter(movie => movie.title.toLowerCase().includes(searchValue))

    //state in input changed through onChange event and onChangeHandler, event.target.value has what it is changed to; input is a controlled component
    return (
        <>
            <h1>Top Movies</h1>
            <div className="search-bar" style={{ background: "#eee", paddingBottom: "15px", paddingLeft: "15px" }}>
                <div className="input-group"  >
                    <label for="searchBar" className="form-label">Filter Title</label>
                    <input
                        className="form-control"
                        type="text"
                        onChange={onChangeHandler}
                        name="searchValue"
                        value={searchValue}
                        placeholder="Filter titles"
                        id="searchBar"


                    />
                </div>
            </div>


            <table className="table">


                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Rating</th>
                        <th>Runtime</th>
                        <th>Votes</th>
                        <th>Genres</th>
                    </tr>
                </thead>
                <tbody>
                    {   //conditional (ternary expression) in case movies are not loaded yet
                        //+ conditional (ternary expression) in case there are no results for searched movies
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
                                            <p>{movie.runtimeMins}</p>

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
                </tbody>
            </table>
        </>
    )
}
