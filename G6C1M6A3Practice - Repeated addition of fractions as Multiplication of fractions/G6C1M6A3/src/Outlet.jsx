import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import SceneFour from "./components/SceneFour";
import SceneFive from "./components/SceneFive";
import SceneSix from "./components/SceneSix";
import ActivityComplete from "./components/ActivityCompleted";
import { useTranslation } from "react-i18next";
const question = [
  [2, 5, 3],
  [1, 3, 4],
  [4, 5, 3],
  [2, 7, 5],
  [1, 6, 4],
  [3, 10, 3],
];
const numberString = [
  "two_fifth",
  "one_thirds",
  "four_fifths",
  "two_sevenths",
  "one_sixths",
  "three_tenths",
];
const Outlet = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [start, setStart] = useState(true);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [scenethree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [sceneSix, setSceneSix] = useState(false);
  const [complete, setComplete] = useState(false);
  const handleSceneTwo = () => {
    setStart(false);
    setSceneTwo(true);
  };
  const handleSceneThree = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handleSceneFour = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handleSceneFive = () => {
    setSceneFour(false);
    setSceneFive(true);
  };
  const handleSceneSix = () => {
    setSceneFive(false);
    setSceneSix(true);
  };
  const handleSceneSeven = () => {
    if (currentIndex + 1 === question.length) {
      setSceneSix(false);
      setComplete(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSceneSix(false);
      setSceneTwo(true);
    }
  };
  const handlePrevOne = () => {
    if (currentIndex === 0) {
      setSceneTwo(false);
      setStart(true);
    } else {
      setCurrentIndex((prev) => prev - 1);
      setSceneTwo(false);
      setSceneSix(true);
    }
  };
  const handlePrevTwo=()=>{
    setSceneThree(false);
    setSceneTwo(true);
  }
  const handlePrevThree=()=>{
    setSceneFour(false);
    setSceneThree(true);
  }
  const handlePrevFour=()=>{
    setSceneFive(false);
    setSceneFour(true);
  }
  const handlePrevFive=()=>{
    setSceneSix(false);
    setSceneFive(true);
  }
  const currentQuestion = question[currentIndex];
  return (
    <div className="outlet">
      {start && <StartPage onClose={handleSceneTwo} />}
      {sceneTwo && (
        <SceneTwo
          question={currentQuestion}
          onNext={handleSceneThree}
          onPrev={handlePrevOne}
        />
      )}
      {scenethree && (
        <SceneThree question={currentQuestion} onNext={handleSceneFour} onPrev={handlePrevTwo}/>
      )}
      {sceneFour && (
        <SceneFour
          question={currentQuestion}
          flag={0}
          numberString={t(numberString[currentIndex])}
          onNext={handleSceneFive}
          onPrev={handlePrevThree}
        />
      )}
      {sceneFive && (
        <SceneFive
          question={currentQuestion}
          flag={1}
          onNext={handleSceneSix}
          onPrev={handlePrevFour}
        />
      )}
      {sceneSix && (
        <SceneSix
          question={currentQuestion}
          flag={1}
          onNext={handleSceneSeven}
          onPrev={handlePrevFive}
        />
      )}
      {complete && <ActivityComplete />}
    </div>
  );
};

export default Outlet;
