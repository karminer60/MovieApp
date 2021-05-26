import logo from './logo.svg';
import './App.css';
import Home from './Home.js';

import axios from 'axios'
import { useEffect } from 'react';

function App() {

  //axios is used to make HTTP requests -  HTTP is the protocol used in the world wide web that determines
  //how messages are formatted and transmitted, and what actions web servers and browsers should take in 
  //response to various commands

  //Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, 
  //such as requests and responses; built into the browser
  //Provides a global fetch() method that provides an easy, logical way to fetch resources asynchrously across the network
  useEffect(() => {
    
    //useEffect being used so that is request only gets called when paramater changes 
    axios.get("http://fp-public-tests.s3-website-us-east-1.amazonaws.com/hr/frontend-challenge/")

    //callback function to handle the response
    .then(response => {
        console.log(response)
    })
    //for case in which we don't get response
    .catch(err => console.log(err.response))
  }, [])
  return (
    <div className="App">
      <Home/>
    </div>
  );
}



export default App;
