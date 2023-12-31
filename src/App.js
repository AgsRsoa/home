import { useState } from 'react';
import Joke from './Joke';
import Stories from './Stories';
import Tasks from './Tasks';
import Gallery from './Gallery';
import Matrix from './Matrix';

function App() {

  const [userQuery,setUserQuery]= useState(""); //useState = function returns 2 values as an array
  const [showGallery, setShowGallery]= useState(true);

  const updateUserQuery = (event) => {
    setUserQuery(event.target.value);
    console.log('userQuery', userQuery)
  }

  const searchQuery = () =>{
    window.open(`https://google.com/search?q=${userQuery}`,'_blank'); //method open redirect to a new url 
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
     searchQuery();
    }
  }
  
  const toggleShowGallery = () =>{
    setShowGallery(!showGallery)
  }
  return (
    <div className="App">
      <h1>Hi Ags</h1>
      <div className ='form'>
        <input 
        value={userQuery} 
        onChange={updateUserQuery}
        onKeyPress={handleKeyPress}/>
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr/>
      <Joke/>
      <hr/>
      <Stories/>
      <hr/>
      <Tasks />
      <hr/>
      <button onClick = {toggleShowGallery}>{showGallery ? 'Hide':'Show'}</button>
      <div>{showGallery ? <Gallery/>: null}</div>
      <hr/>
      <Matrix />
    </div>
  );
}

export default App;
