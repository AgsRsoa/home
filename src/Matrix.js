import React, {useState, useEffect} from 'react';
import MATRIX_FRAMES from './data/matrix';
import { useDynamicTransition } from './hooks';

const minimumDelay = 10;
const minimumIncrement = 1;

function Matrix(){

   // const [index, setIndex]= useState(0);
    const [delay, setDelay] = useState(500); //delay: internal state variable delay used by the component
    const [increment, setIncrement] = useState(5);

    const index = useDynamicTransition({delay,increment, length:MATRIX_FRAMES.length})
    /*useEffect(()=>{const interval = setInterval(()=>{setIndex(storedIndex=>{return (storedIndex + increment)%MATRIX_FRAMES.length})},1000)
    return ()=>{clearInterval(interval)}
},[delay,increment])*/
//without storedIndex everytime we call setIndex the value of the index will be 0.

const updateDelay = (event) =>{
    const userDelay = Number(event.target.value);
    setDelay( userDelay < minimumDelay ? minimumDelay : userDelay)
}

const updateIncrement = (event) =>{
    const userIncrement = Number(event.target.value);
    setIncrement(userIncrement < minimumIncrement? minimumIncrement : userIncrement)
}
console.log('delay', delay, 'increment', increment)

    return(<>
    <div className='Matrix'>
         <img src ={MATRIX_FRAMES[index]} alt='matrix-animation'/>
         <div className='multiform'>
            <div>
                Frame transition delay (seconds)
                <input type='number' onChange={updateDelay}/>
            </div>
            <div>
                Frame increment
                <input type='number' onChange={updateIncrement}/>
            </div>
         </div>
    </div>
    </>)

}

export default Matrix;