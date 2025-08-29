import React, { useState } from "react";
import "./Outlet.css";
import StartingPage from "./components/StartingPage";
import Main from "./components/Main";

const question = [
  [5, 1, 4],
  [9, 3, 6],
  [5, 5, 0],
  [8, 0, 8],
  [8, 6, 2],
];
const Outlet = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [start, setStart] = useState(true);
  const [main, setMain] = useState(false);
  const handlePage = () => {
    setStart(false);
    setMain(true);
  };
  const handleMain = () => {
    setMain(false);
    if (questionIndex === question.length - 1) {
      window.location.reload();
      return;
    }
    setQuestionIndex((prev) => prev + 1);

    setStart(true);
  };
  const currentQuestion = question[questionIndex];
  return (
    <div className="outlet">
      {start && <StartingPage question={currentQuestion} onNext={handlePage} />}
      {main && <Main question={currentQuestion} onNext={handleMain} />}
    </div>
  );
};

export default Outlet;
