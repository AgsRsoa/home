import React, {useState,useEffect} from 'react';
import PICTURES from '../src/data/pictures';
import { useDynamicTransition } from './hooks';

const SECONDS = 1000;
const minimumDelay = 1*SECONDS;
const minimumIncrement = 1;
//Displays picture from gallery based on index, and change the index at a regular interval to display a new picture
function Gallery(){
    //const [index, setIndex] = useState(0);
    const [delay,setDelay] = useState(3*SECONDS);
    const [increment,setIncrement]= useState(1);

    const index = useDynamicTransition({delay,increment,length:PICTURES.length});
   /* useEffect(()=>{
        console.log('delay',delay, 'increment',increment)
       const interval = setInterval(()=>{setIndex(storedIndex=>{return (storedIndex+increment)%PICTURES.length})},delay) 
       return ()=>{console.log('remove last interval'); clearInterval(interval)}
    },[delay,increment]); */

    /*When creating callback into React engine, variable are already defined in closure.
    So when we set the callback to increment the index initially, the index variable is set to 0.
    It gets a chance to increment that index to 1 on a re-render.But we are not refiring the effect.
    So the interval that is running is still firing the callback that was sent off and created with that initial
    first render.Therefore that original interval will always see that original index at zero initially
    when it fires off that callback. SYNTAX provided by React for the setter function to force React to pull the latest value.
    On utilise storedIndex so setIndex uses the latest value storedIndex of the state variable rather than the index as it was defined when the callback was created
    */ 
   /*useEffect  sends a callback with a closure that keeps its variables defined to what they were when thery were created > alternative syntax*/
    /*[] so useEffect apply only after initial render of the Gallery component. 
    And telling React not to look for variables who have changed to reaply the useEffect*/

    /*It can be possible that the component is being removed before the setter function has fully completed.
    Error memory leak due to calling state update on an unmounted component.Cleanup functionnalities by returning a callback by useEffect. The cleanup is applied for every effects that are triggered.
    Après setInterval return ()=>{clearInterval(interval);} */ 

    const updateDelay = (event) =>{
        const delay = Number(event.target.value) *SECONDS;
        setDelay(delay < minimumDelay ? minimumDelay : delay)
    }

    const updateIncrement = (event) =>{
       const increment =  Number(event.target.value);
        setIncrement(increment < minimumIncrement ? minimumIncrement:increment)
    }

    //console.log('index',index)
    return (<>
        <div className='Gallery'>
            <img src={PICTURES[index].image} alt='gallery'/>
            <div className='multiform'>Gallery transition delay (sec):
            <input type='number' onChange={updateDelay}/>
            </div>
            <div>
                Gallery increment:
                <input type='number' onChange={updateIncrement}/>
            </div>
        </div>
    </>)
}

export default Gallery;