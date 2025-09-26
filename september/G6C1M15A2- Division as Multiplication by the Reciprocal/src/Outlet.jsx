import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import SceneOne from "./components/SceneOne";
import HintSlide from "./components/HintSlide";
import ActivityCompleted from "./components/ActivityCompleted";
import RefreshDetector from "./components/RefreshDetector";
const question = [
  [3, 5, "one"],
  [4, 7, "two"],
  [2, 9, "three"],
  [3, 8, "four"],
  [5, 6, "five"],
];
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [sceneOne, setSceneOne] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [hintSlide, setHintSlide] = useState(false);
  const [complete, setComplete] = useState(false);
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
  const handlePrevFour = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  const handleNextFour = () => {
    setSceneFour(false);
    setSceneFive(true);
  };
  const handlePrevFive = () => {
    setSceneFive(false);
    setSceneFour(true);
  };
  const handleNextFive = () => {
    setSceneFive(false);
    setComplete(true);
  };
  return (
    <div className="outlet">
      {start && <StartPage onClose={handleStart} />}
      {sceneOne && (
        <SceneOne
          onPrev={handlePrevOne}
          onNext={handleNextOne}
          question={question[0]}
          setHintSlide={() => {
            setHintSlide(true);
          }}
        />
      )}
      {sceneTwo && (
        <SceneOne
          onPrev={handlePrevTwo}
          onNext={handleNextTwo}
          question={question[1]}
          setHintSlide={() => {
            setHintSlide(true);
          }}
        />
      )}
      {sceneThree && (
        <SceneOne
          onPrev={handlePrevThree}
          onNext={handleNextThree}
          question={question[2]}
          setHintSlide={() => {
            setHintSlide(true);
          }}
        />
      )}
      {sceneFour && (
        <SceneOne
          onPrev={handlePrevFour}
          onNext={handleNextFour}
          question={question[3]}
          setHintSlide={() => {
            setHintSlide(true);
          }}
        />
      )}
      {sceneFive && (
        <SceneOne
          onPrev={handlePrevFive}
          onNext={handleNextFive}
          question={question[4]}
          setHintSlide={() => {
            setHintSlide(true);
          }}
        />
      )}
      {hintSlide && <HintSlide onClose={() => setHintSlide(false)} />}
      {complete && <ActivityCompleted />}
      <RefreshDetector />
    </div>
  );
};

export default Outlet;
