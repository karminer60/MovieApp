import React, { useState } from 'react'


/*- Year
  - Rating
  - Runtime
  - Votes
  - Genres */


//passing state through props from App

const filteredDefaults = {
    searchValue: '', genre: '', direction: 'asc', sortColumn: '', rowLimit: '50'
}
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
    
    const stored = window.localStorage.getItem('filteredValues');
    const [filteredValues, setFilteredValues] = useState(stored!= null? JSON.parse(stored): filteredDefaults);

    function onChangeHandler(event) {
        const values = { ...filteredValues, [event.target.name]: event.target.value }
        setFilteredValues(values);
        window.localStorage.setItem('filteredValues',JSON.stringify(values))
    }

    //filtered variable checks for no movies list, else filters for searchValue set in onChangeHandler through user input event
    //filtered variable is made available to provide 'no results message' in return
    let results = null
    if (movies != null) {
        
        results = movies.filter(movie => movie.title.toLowerCase().includes(filteredValues.searchValue.toLowerCase()) && (filteredValues.genre === "" || movie.genres.includes(filteredValues.genre)));
        if (filteredValues.sortColumn !== "") {
            results.sort(
                (a, b) => {
                    if (a[filteredValues.sortColumn] > b[filteredValues.sortColumn]) {

                        return filteredValues.direction === "asc" ? 1 : -1;
                    }
                    if (a[filteredValues.sortColumn] < b[filteredValues.sortColumn]) {
                        return filteredValues.direction === "asc" ? -1 : 1;
                    }
                    return 0;
                }
            )
        }
        results = results.slice(0, Number(filteredValues.rowLimit))
    }


    //state in input changed through onChange event and onChangeHandler, event.target.value has what it is changed to; input is a controlled component
    return (
        <>
            <h1>Top Movies</h1>
            <table className="table" style={{ background: "#eee" }} >

                <tbody>
                    <tr>
                        <td> 
                            <div className="search-bar">
                                <div className="input-group">
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
                                Filter Genre&nbsp;
                            {/* mapping through genreCounter object to create select options that display each genre's count */}
                                <select name="genre" className="form-select" aria-label="Genres" value={filteredValues.genre} onChange={onChangeHandler} >
                                    <option value="">(Any Genre)</option>
                                    {/*[key,value] same as key=pair1 and value=pair2*/}
                                    {Object.entries(genreCounter).map(([key, value]) => <option value={key}>{key} ({value})</option>)}



                                </select>

                            </label>
                        </td>

                        <td className="sortFilter">
                            <label>
                                Sort Column&nbsp;
                            <select name="sortColumn" className="form-select" aria-label="Sort Column" onChange={onChangeHandler} value={filteredValues.sortColumn}  >
                                    <option value="">(None)</option>

                                    <option value="title">Title</option>
                                    <option value="year">Year</option>
                                    <option value="rating">Raiting</option>
                                    <option value="runtimeMins">Runtime</option>
                                    <option value="votes">Votes</option>


                                </select>
                            </label>

                        </td>

                        <td className="asc-dsc">
                            <label className="form-label">
                                Sort Direction&nbsp;
                            <select name="direction" className="form-select" aria-label="Sort Direction" onChange={onChangeHandler} value={filteredValues.direction}  >
                                    <option value="asc">ASC</option>

                                    <option value="dsc">DSC</option>

                                </select>
                            </label>

                        </td>

                        <td className="rowLimit">
                            <label>
                                Row Limit&nbsp;
                                <input
                                    type="number"
                                    name="rowLimit"
                                    min="1"
                                    max="50"j
                                    onChange={onChangeHandler}
                                    value={filteredValues.rowLimit}
                                />

                            </label>
                        </td>
                        <td className="reset">
                            <label>

                                <button onClick={()=> {
                                setFilteredValues(filteredDefaults);
                                window.localStorage.setItem('filteredValues', JSON.stringify(filteredDefaults));
                                }}> 
                                Reset Filters 
                                </button>

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
                        results === null ? <tr><td>Loading data...</td></tr> :
                            results.length === 0 ? <tr><td>No records match your search.</td></tr> :
                                results.map(movie => (
                                    <tr>
                                        <td>
                                            <img alt="url" style={{ width: "8rem", height: "11rem" }} src={movie.imageUrl} />

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

                                                if (index === 0) {
                                                    return genre;
                                                }

                                                else if (index === movie.genres.length - 1) {
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
