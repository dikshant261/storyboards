import React, { useState } from "react";
import "./Outlet.css";
import SceneOne from "./components/SceneOne";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import SceneFour from "./components/SceneFour";
import SceneFive from "./components/SceneFive";
import SceneSix from "./components/SceneSix";
const Outlet = () => {
  const [sceneOne, setSeceneOne] = useState(true);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [sceneSix, setSceneSix] = useState(false);
  const handleNextOne = () => {
    setSeceneOne(false);
    setSceneTwo(true);
  };
  const handleNextTwo = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handleNextThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handleNextFour = () => {
    setSceneFour(false);
    setSceneFive(true);
  };
  const handleNextFive = () => {
    setSceneFive(false);
    setSceneSix(true);
  };
  const handlePrevOne = () => {
    setSceneTwo(false);
    setSeceneOne(true);
  };
  const handlePrevTwo = () => {
    setSceneThree(false);
    setSceneTwo(true);
  };
  const handlePrevThree = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  const handlePrevFour = () => {
    setSceneFive(false);
    setSceneFour(true);
  };
  const handlePrevFive = () => {
    setSceneSix(false);
    setSceneFive(true);
  };
  return (
    <div className="outlet">
      {sceneOne && <SceneOne onNext={handleNextOne} />}
      {sceneTwo && <SceneTwo onNext={handleNextTwo} onPrev={handlePrevOne} />}
      {sceneThree && (
        <SceneThree onNext={handleNextThree} onPrev={handlePrevTwo} />
      )}
      {sceneFour && (
        <SceneFour onPrev={handlePrevThree} onNext={handleNextFour} />
      )}
      {sceneFive && (
        <SceneFive onPrev={handlePrevFour} onNext={handleNextFive} />
      )}
      {sceneSix && <SceneSix onPrev={handlePrevFive} />}
    </div>
  );
};

export default Outlet;
