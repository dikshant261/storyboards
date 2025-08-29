import React, { useState } from "react";
import "./Outlet.css";
import FirstPages from "./Components/FirstPages";
import Main from "./Components/Main";
import MainTwo from "./Components/MainTwo";
import SecondPage from "./Components/SecondPage";
import ThirdPage from "./Components/ThirdPage";
import MainThree from "./Components/MainThree";
const question = [
  { totalCars: 8, crossCars: 5 },
  { totalCars: 4, crossCars: 4 },
  {
    totalCars: 7,
    crossCars: 6,
  },
];
const Outlet = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [start, setStart] = useState(true);
  const [startTwo, setStartTwo] = useState(false);
  const [startThree, setStartThree] = useState(false);
  const [main, setMain] = useState(false);
  const [typeTwo, setTypeTwo] = useState(false);
  const [typeThree, setTypeThree] = useState(false);
  const handleStart = () => {
    setStart(false);
    setMain(true);
  };
  const handleNextOne = () => {
    setMain(false);
    setStartTwo(true);
  };
  const handleStartTwo = () => {
    setStartTwo(false);
    setTypeTwo(true);
  };
  const handleNextTwo = () => {
    setTypeTwo(false);
    setStartThree(true);
  };
  const handleNextThree = () => {
    if (questionIndex + 1 >= question.length) {
      window.location.reload();
      return;
    }
    setQuestionIndex((prev) => prev + 1);
    setStartThree(true);
  };
  const handleStartThree = () => {
    setStartThree(false);
    setTypeThree(true);
  };
  const currentQuestion = question[questionIndex];
  return (
    <div className="outlet">
      {start && <FirstPages onClose={handleStart} />}
      {main && <Main nextOne={handleNextOne} />}
      {startTwo && <SecondPage onClose={handleStartTwo} />}
      {typeTwo && <MainTwo nextTwo={handleNextTwo} />}
      {startThree && (
        <ThirdPage onClose={handleStartThree} questionData={currentQuestion} />
      )}
      {typeThree && (
        <MainThree onNext={handleNextThree} currentQuestion={currentQuestion} />
      )}
    </div>
  );
};

export default Outlet;
