import React, { useState } from "react";
import "./outlet.css";
import MixedNumbers from "./components/MixedNumbers";
import Main from "./components/Main";
import ActivityComplete from "./components/ActivityComplete";
const Outlet = () => {
  const [startChallenge, setStartChallenge] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const handleStartClick = () => {
    setStartChallenge(false);
    setShowMain(true);
  };
  const handleComplete = () => {
    setShowMain(false);
    setShowComplete(true);
  };
  return (
    <div className="container">
      {startChallenge && <MixedNumbers onStart={handleStartClick} />}
      <div>{showMain && <Main completeActivity={handleComplete} />}</div>
      <div>{showComplete && <ActivityComplete />}</div>
    </div>
  );
};

export default Outlet;
