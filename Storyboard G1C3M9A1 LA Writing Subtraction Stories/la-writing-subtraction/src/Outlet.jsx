import React, { useState } from "react";
import "./Outlet.css";
import FirstPage from "./Components/FirstPage";
import FrameOne from "./Components/FrameOne";
import SecondPage from "./Components/SecondPage";
import FrameTwo from "./Components/FrameTwo";
import ThirdPage from "./Components/ThirdPage";
import FrameThird from "./Components/FrameThird";

const Outlet = () => {
    const [first,setFirst]=useState(true);
    const [frameOne,setFrameOne]=useState(false);
    const [second,setSecond]=useState(false);
    const [frameTwo,setFrameTwo]=useState(false);
    const [third,setThird]=useState(false);
    const [frameThree,setFrameThree]=useState(false);
    const handleFirst=()=>{
       setFirst(false);
       setFrameOne(true);
    } 
    const handleFrameOne=()=>{
        setFrameOne(false);
        setSecond(true);
    }
    const handleSecond=()=>{
        setSecond(false);
        setFrameTwo(true);
    }
    const handleFrameTwo=()=>{
        setFrameTwo(false);
        setThird(true);
    }
    const handleThird=()=>{
        setThird(false);
        setFrameThree(true);
    }
  return (
    <div className="outlet">
      {first && <FirstPage onClose={handleFirst}/>}
      {frameOne && <FrameOne onNext={handleFrameOne}/>}
      {second && <SecondPage onClose={handleSecond}/>}
      {frameTwo && <FrameTwo onNext={handleFrameTwo}/>}
      {third && <ThirdPage onClose={handleThird}/>}
      {frameThree && <FrameThird/>}
    </div>
  );
};

export default Outlet;
