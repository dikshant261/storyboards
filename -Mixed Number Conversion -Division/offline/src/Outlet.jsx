import React, { useState } from "react";
import "./OutLet.css";
import Main from "./Components/Main";
import ActivityCompleted from "./Components/ActivityCompleted";
const Outlet = () => {
    const [start,setStart]=useState(true);
    const [activity,setActivity]=useState(false);

    const handleActivity=()=>{
        setStart(false);
        setActivity(true)
    }
  return (
    <div className="outlet">

      {start && <Main activity={handleActivity}/>}
      {activity && <ActivityCompleted/>}
    </div>
  );
};

export default Outlet;
