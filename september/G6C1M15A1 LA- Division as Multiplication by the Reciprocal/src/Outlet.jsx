import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import SceneOne from "./components/SceneOne";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import SceneFour from "./components/SceneFour";
import SceneFive from "./components/SceneFive";
import ActivityCompleted from "./components/ActivityCompleted";
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [sceneOne, setSceneOne] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [complete,setComplete]=useState(false);
  const handleStart = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handleNextOne = () => {
    setSceneOne(false);
    setSceneTwo(true);
  };

  const handlePrevOne = () => {
    setSceneOne(false);
    setStart(true);
  };
  const handlePrevTwo = () => {
    setSceneTwo(false);
    setSceneOne(true);
  };
  const handleNextTwo = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handlePrevThree = () => {
    setSceneThree(false);
    setSceneTwo(true);
  };
  const handleNextThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handleNextFour = () => {
    setSceneFour(false);
    setSceneFive(true);
  };
  const handleNextFive=()=>{
    setSceneFive(false);
    setComplete(true);
  }
  const handlePrevFour=()=>{
    setSceneFour(false);
    setSceneThree(true);
  }
  const handlePrevFive=()=>{
    setSceneFive(false);
    setSceneFour(true);
  }
  console.log(sceneFour);
  return (
    <div className="outlet">
      {start && <StartPage onClose={handleStart} />}
      {sceneOne && <SceneOne onNext={handleNextOne} onPrev={handlePrevOne} />}
      {sceneTwo && <SceneTwo onPrev={handlePrevTwo} onNext={handleNextTwo} />}
      {sceneThree && (
        <SceneThree onPrev={handlePrevThree} onNext={handleNextThree} />
      )}
      {sceneFour && <SceneFour onNext={handleNextFour} onPrev={handlePrevFour}/>}
      {sceneFive && <SceneFive onNext={handleNextFive} onPrev={handlePrevFive}/>}
      {complete && <ActivityCompleted/>}
    </div>
  );
};

export default Outlet;
