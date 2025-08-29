import React, { useState } from "react";
import "./outlet.css";
import Main from "./components/Main";
import ActivityCompleted from "./components/ActivityComplete";
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [complete, setComplete] = useState(false);

  const handleComplete = () => {
    setStart(false);
    setComplete(true);
  };
  return (
    <div className="container">
      <div
        className={`fade-section${start ? ' fade-in' : ' fade-out'}`}
        style={{ display: start ? 'block' : 'none' }}
      >
        <Main completeActivity={handleComplete} />
      </div>
      <div
        className={`fade-section${complete ? ' fade-in' : ' fade-out'}`}
        style={{ display: complete ? 'block' : 'none' }}
      >
        <ActivityCompleted />
      </div>
    </div>
  );
};

export default Outlet;
