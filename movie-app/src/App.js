
import './App.css';
import MovieList from './MovieList.js';

import axios from 'axios'
import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'


//create react app
function App() {
  const [movieList, setMovieList] = useState(null);



  //axios is used to make HTTP requests -  HTTP is the protocol used in the world wide web that determines
  //how messages are formatted and transmitted, and what actions web servers and browsers should take in 
  //response to various commands

  //Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, 
  //such as requests and responses; built into the browser
  //Provides a global fetch() method that provides an easy, logical way to fetch resources asynchrously across the network


  //useEffect being used so that is request only gets called when paramater changes 
  const getMovies = () => {
    axios.get("https://6049e293fb5dcc001796aba6.mockapi.io/movies")

      //callback function to handle the response
      //setMovieList to fetched data
      .then(res => setMovieList(res.data))

      //for case in which we don't get response
      .catch(err => console.log(err.response))

  }

  useEffect(() => {
    getMovies();
  }, [])


  return (
    <div className="App">
      <div className="container">

        <MovieList movies={movieList} />

      </div>

    </div>
  );
}



export default App;
