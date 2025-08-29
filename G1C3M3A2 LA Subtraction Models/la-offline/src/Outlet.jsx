import React, { useState } from 'react'
import './Outlet.css';
import FirstPages from './components/FirstPages';
import Main from './components/Main';
const Outlet = () => {
    const [start,setStart]=useState(true)
    const [main,setMain]=useState(false);
    const handleStart=()=>{
        setStart(false);
        setMain(true);  
    }
  return (
    <div className='outlet'>

        {start && <FirstPages onClose={handleStart}/>}
        {main && <Main/>}
    </div>
  )
}

export default Outlet