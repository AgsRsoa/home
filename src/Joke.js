import React from 'react';
import {useFetch} from './hooks'

const Joke = () => {
    const joke = useFetch('https://official-joke-api.appspot.com/random_joke',{});
    const {setup, punchline} = joke;
    //en 1 ligne const {setup, punchline} = useFetch('https://official-joke-api.appspot.com/random_joke',{});
   
    /*const [joke,setJoke]= useState({});

    useEffect(()=>{
        fetch('https://official-joke-api.appspot.com/random_joke')
        .then((response)=>{return response.json()}) //response n'est pas du JSON mais object response de l'API qu'on peut transformer en json
        .then((json)=>{
            console.log('joke json', json)
        setJoke(json)})
    },[]);
    //Initial render > Compononent has mounted in the DOM > the callback function fires after every render
    //Then conducts the fecth after the mount and re-rendering data when its available
    //[] empty array to make sure that the effect runs only once after the initial component mount, which is the typical behavior for making an HTTP request
    const {setup, punchline} = joke;
    */
    
    return(
        <div>
            <h3>Joke</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
        </div>
    )
}

export default Joke;
