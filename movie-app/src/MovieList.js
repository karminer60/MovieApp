import React, { useState } from 'react'


/*- Year
  - Rating
  - Runtime
  - Votes
  - Genres */


//passing state through props from App
export default function MovieList(props) {

    const { movies } = props;

    const genreCounter = {}
    if (movies != null) {


        for (const movie of movies) {
            for (const genre of movie.genres) {
                if (genre in genreCounter) {
                    genreCounter[genre] += 1
                }

                else {
                    genreCounter[genre] = 1
                }

            }
        }
    }
    const [filteredValues, setFilteredValues] = useState({
        searchValue: '', genre: 'Adventure', direction: 'ascending', column: 'title',
    });

    function onChangeHandler(event) {
        setFilteredValues({ ...filteredValues, [event.target.name]: event.target.value });
    }

    //filtered variable checks for no movies list, else filters for searchValue set in onChangeHandler through user input event
    //filtered variable is made available to provide 'no results message' in return
    const filtered = movies === null ? null : movies.filter(movie => movie.title.toLowerCase().includes(filteredValues.searchValue.toLowerCase()) && movie.genres.includes(filteredValues.genre));

    //state in input changed through onChange event and onChangeHandler, event.target.value has what it is changed to; input is a controlled component
    return (
        <>
            <h1>Top Movies</h1>
            <table className="table" style={{ background: "#eee", paddingBottom: "15px", paddingLeft: "15px" }} >

                <tbody>
                    <tr>
                        <td>
                            <div className="search-bar" >
                                <div className="input-group"  >
                                    <label for="searchBar" className="form-label">Filter Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={onChangeHandler}
                                        name="searchValue"
                                        value={filteredValues.searchValue}
                                        placeholder="Filter titles"
                                        id="searchBar"
                                    />
                                </div>
                            </div>
                        </td>
                        <td className="genreFilter">
                            <label>
                                Filter Genre
                            {/* mapping through genreCounter object to create select options that display each genre's count */}
                            <select name="genre" className="form-select" aria-label="Genres" value={filteredValues.genre} onChange={onChangeHandler}  >
                                    <option value="">(Any Genre)</option>
                                    {Object.entries(genreCounter).map(([key, value]) => <option value={key}>{key} ({value})</option>)}



                                </select>

                            </label>
                        </td>

                        <td className="sortFiler">
                            <label>
                                Sort Column
                            <select className="form-select" aria-label="Sort Column" onChange={onChangeHandler} >
                                    <option selected>(None)</option>

                                    <option value="genre1">Genre 1</option>
                                    <option value="genre2">Genre 2</option>
                                    <option value="genre3">Genre 3</option>
                                    <option value="genre4">Genre 4</option>

                                </select>
                            </label>

                        </td>

                        <td className="asc-dsc">
                            <label className="form-label">
                                Sort Direction
                            <select className="form-select" aria-label="Sort Direction" onChange={onChangeHandler} >
                                    <option selected>ASC</option>

                                    <option value="genre1">Genre 1</option>
                                    <option value="genre2">Genre 2</option>
                                    <option value="genre3">Genre 3</option>
                                    <option value="genre4">Genre 4</option>

                                </select>
                            </label>

                        </td>

                        <td className="rowLimit">
                            <label>
                                Row Limit
                            <select className="form-select" aria-label="Row Limit" onChange={onChangeHandler}  >
                                    <option selected>50</option>

                                    <option value="genre1">Genre 1</option>
                                    <option value="genre2">Genre 2</option>
                                    <option value="genre3">Genre 3</option>
                                    <option value="genre4">Genre 4</option>

                                </select>

                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>


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
                                            <img style={{ width: "8rem", height: "11rem" }} src={movie.imageUrl} />

                                        </td>
                                        <td>
                                            <a href={movie.url}>
                                                <h2 style={{ fontSize: "17px" }}>{movie.title}</h2>
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
                                            <p>{movie.runtimeMins} min</p>

                                        </td>

                                        <td>
                                            <p>{movie.votes}</p>

                                        </td>

                                        <td>
                                            <p>{movie.genres.map((genre, index) => {

                                                if (index == 0) {
                                                    return genre;
                                                }

                                                else if (index == movie.genres.length - 1) {
                                                    return " and " + genre;
                                                }

                                                else {
                                                    return ", " + genre;
                                                }


                                            })}
                                            </p>

                                        </td>

                                    </tr>
                                ))
                    }
                </tbody>
            </table>
        </>
    )
}
