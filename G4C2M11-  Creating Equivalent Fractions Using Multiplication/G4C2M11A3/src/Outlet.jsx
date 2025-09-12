import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import SceneOne from "./components/SceneOne";
import SceneTwo from "./components/SceneTwo";
import NextPart from "./components/NextPart";
import SceneFour from "./components/SceneFour";
import End from "./components/End";
import SceneThree from "./components/ScenThree";
const question = [
  [1, 5, 5, 25],
  [1, 6, 2, 12],
  [2, 3, 6, 9],
  [3, 5, 15, 25],
];
const questionDivide = [
  [4, 16, 1, 4],
  [2, 18, 1, 9],
  [6, 15, 2, 5],
  [12, 21, 4, 7],
];
const Outlet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexDivide, setCurrentIndexDivide] = useState(0);
  const [start, setStart] = useState(true);
  const [sceneOne, setSceneOne] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [nextPart, setNextPart] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [end, setEnd] = useState(false);
  const startClose = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handleSceneOne = () => {
    setSceneOne(false);
    setSceneTwo(true);
  };
  const handleSceneTwo = () => {
    if (currentIndex + 1 === question.length) {
      setSceneTwo(false);
      setNextPart(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSceneTwo(false);
    setSceneOne(true);
  };

  const handlePrevOne = () => {
    if (currentIndex === 0) {
      setSceneOne(false);
      setStart(true);
    } else {
      setCurrentIndex((prev) => prev - 1);
      setSceneOne(false);
      setSceneTwo(true);
    }
  };
  const handlePrevTwo = () => {
    setSceneTwo(false);
    setSceneOne(true);
  };
  const currentQuestion = question[currentIndex];
  const handleDivide = () => {
    setNextPart(false);
    setSceneThree(true);
  };
  const handleSceneThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handleSceneFour = () => {
    if (currentIndexDivide + 1 === questionDivide.length) {
      setSceneFour(false);
      setEnd(true);
      return;
    } else {
      setCurrentIndexDivide((prev) => prev + 1);
      setSceneFour(false);
      setSceneThree(true);
    }
  };
  const handlePrevThree = () => {
    if (currentIndexDivide === 0) {
      setSceneThree(false);
      setNextPart(true);
    } else {
      setCurrentIndexDivide((prev) => prev - 1);
      setSceneThree(false);
      setSceneFour(true);
    }
  };
  const handlePrevFour = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  const currentQuestionDivide = questionDivide[currentIndexDivide];
  return (
    <div className="outlet">
      {start && <StartPage onClose={startClose} />}
      {sceneOne && (
        <SceneOne
          question={currentQuestion}
          onNext={handleSceneOne}
          onPrev={handlePrevOne}
        />
      )}
      {sceneTwo && (
        <SceneTwo
          question={currentQuestion}
          onNext={handleSceneTwo}
          onPrev={handlePrevTwo}
        />
      )}
      {nextPart && <NextPart onClose={handleDivide} />}
      {sceneThree && (
        <SceneThree
          question={currentQuestionDivide}
          onNext={handleSceneThree}
          onPrev={handlePrevThree}
        />
      )}
      {sceneFour && (
        <SceneFour
          question={currentQuestionDivide}
          onPrev={handlePrevFour}
          onNext={handleSceneFour}
        />
      )}
      {end && <End />}
    </div>
  );
};

export default Outlet;
