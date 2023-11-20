import {useState,useEffect} from 'react';

/*Ici custom hook avec les valeurs uniques qui distinguent les 2 componsants*/
export const useFetch = (url,initialValue)=>{
    const [result,setResult]= useState(initialValue);
    
    useEffect(()=>{
        fetch(url)
        .then((response)=>{return response.json()}) //response n'est pas du JSON mais object response de l'API qu'on peut transformer en json
        .then((json)=>{setResult(json)})
    },[]);

    return result;
}

export const useDynamicTransition = ({increment,delay,length}) =>{

    const [index, setIndex] = useState(0);

    useEffect(()=>{
       
       const interval = setInterval(()=>{setIndex(storedIndex=>{return (storedIndex+increment)%length})},delay) 
       return ()=>{ clearInterval(interval)}
    },[delay,increment]); 

    return index
}