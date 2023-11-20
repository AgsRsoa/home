import React from 'react';
import {useFetch} from './hooks';

const Stories = () =>{

   /* const [stories, setStories] = useState([]);

    useEffect(()=>{
        fetch('https://news-proxy-230704.appspot.com/topstories')
        .then((response) =>{return response.json()})
        .then((json) =>{
            console.log(json)
            setStories(json)
        })
    },[])*/
   
    const stories = useFetch('https://news-proxy-230704.appspot.com/topstories',[]);
  

    return(
        <div className='Sotries'>
            <h3>Sotries</h3>
            { //map renvoie du JSX 
                stories.map((story)=>{
                    const {id,by,time,title,url} = story;
                    return(
                    <div key={id}>
                        <a href={url}>{title}</a>
                        <div>By:{by} - {new Date(time *1000).toLocaleString()}</div> 
                        </div>
                    );

                })
            }
        </div>
    )
}

export default Stories;
