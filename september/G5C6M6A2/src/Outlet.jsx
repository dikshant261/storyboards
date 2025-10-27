import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import Scene from "./components/Scene";
import SceneTwo from "./components/SceneTwo";
import RefreshDetector from "./components/RefreshDetector";
import ActivityCompleted from "./components/ActivityCompleted";
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [scene, setScene] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [end, setEnd] = useState(false);
  const handleStart = () => {
    setStart(false);
    setScene(true);
  };
  const handleNextOne = () => {
    setScene(false);
    setSceneTwo(true);
  };
  const handleOver = () => {
    setSceneTwo(false);
    setEnd(true);
  };
  return (
    <div className="outlet">
      {start && <StartPage onClose={handleStart} />}
      {scene && <Scene onNext={handleNextOne} />}
      {sceneTwo && <SceneTwo onNext={handleOver} />}
      {end && <ActivityCompleted />}
      <RefreshDetector />
    </div>
  );
};

export default Outlet;
