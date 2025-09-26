import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import SceneOne from "./components/SceneOne";
import HintSlide from "./components/HintSlide";
import ActivityCompleted from "./components/ActivityCompleted";
const question = [
  [3, 5],
  [4, 7],
  [2, 9],
  [3, 8],
  [5, 6],
];
const Outlet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [start, setStart] = useState(true);
  const [sceneOne, setSceneOne] = useState(false);
  const [hintSlide, setHintSlide] = useState(false);
  const [complete, setComplete] = useState(false);
  const handleStart = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handleNextOne = () => {
    if(currentIndex+1===question.length){
      setSceneOne(false);
      setComplete(true);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevOne = () => {
    if (currentIndex === 0) {
      setSceneOne(false);
      setStart(true);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const currentQuestion = question[currentIndex];
  return (
    <div className="outlet">
      {start && <StartPage onClose={handleStart} />}
      {sceneOne && (
        <SceneOne
          onPrev={handlePrevOne}
          onNext={handleNextOne}
          question={currentQuestion}
          setHintSlide={() => {
            setHintSlide(true);
          }}
        />
      )}
      {hintSlide && <HintSlide onClose={() => setHintSlide(false)} />}
        {complete && <ActivityCompleted/>}
    </div>
  );
};

export default Outlet;
