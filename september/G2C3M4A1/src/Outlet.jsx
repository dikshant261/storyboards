import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import SceneOne from "./components/SceneOne";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import SceneFour from "./components/SceneFour";
import SceneFive from "./components/SceneFive";
import SceneSix from "./components/SceneSix";
import SceneSeven from "./components/SceneSvene";
import SceneEight from "./components/SceneEight";
import SceneNine from "./components/SceneNine";
import SceneTen from "./components/SceneTen";
import SceneEleven from "./components/SceneEleven";
import SceneTwelve from "./components/SceneTweleve";
import HalfLesson from "./components/HalfLesson";

const Outlet = () => {
  const [start, setStart] = useState(true);
  const [scenOne, setSceneOne] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [sceneSix, setSceneSix] = useState(false);
  const [sceneSeven, setSceneSeven] = useState(false);
  const [sceneEight, setSceneEight] = useState(false);
  const [sceneNine, setSceneNine] = useState(false);
  const [sceneTen, setSceneTen] = useState(false);
  const [sceneEleven, setSceneEleven] = useState(false);
  const [sceneTweleve, setSceneTweleve] = useState(false);
  const [lesson, setLesson] = useState(false);
  const handleStart = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handleNext = () => {
    setSceneOne(false);
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
  const handleNextSix = () => {
    setSceneSix(false);
    setSceneSeven(true);
  };
  const handleNextSeven = () => {
    setSceneSeven(false);
    setSceneEight(true);
  };
  const handleNextEight = () => {
    setSceneEight(false);
    setSceneNine(true);
  };
  const handleNextNine = () => {
    setSceneNine(false);
    setSceneTen(true);
  };
  const handleNextTen = () => {
    setSceneTen(false);
    setSceneEleven(true);
  };
  const handleNextEleven = () => {
    setSceneEleven(false);
    setSceneTweleve(true);
  };
  const handleNextEnd = () => {
    setSceneTweleve(false);
    setLesson(true);
  };
  return (
    <div className="outlet">
      {start && <StartPage onStart={handleStart} />}
      {scenOne && <SceneOne onNext={handleNext} />}
      {sceneTwo && <SceneTwo onNext={handleNextTwo} />}
      {sceneThree && <SceneThree onNext={handleNextThree} />}
      {sceneFour && <SceneFour onNext={handleNextFour} />}
      {sceneFive && <SceneFive onNext={handleNextFive} />}
      {sceneSix && <SceneSix onNext={handleNextSix} />}
      {sceneSeven && <SceneSeven onNext={handleNextSeven} />}
      {sceneEight && <SceneEight onNext={handleNextEight} />}
      {sceneNine && <SceneNine onNext={handleNextNine} />}
      {sceneTen && <SceneTen onNext={handleNextTen} />}
      {sceneEleven && <SceneEleven onNext={handleNextEleven} />}
      {sceneTweleve && <SceneTwelve onNext={handleNextEnd} />}
      {lesson && <HalfLesson />}
    </div>
  );
};

export default Outlet;
