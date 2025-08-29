import React, { useState } from "react";
import "./Main.css";
import Fraction from "./Fraction";
import Option from "./Option";
import ErrorAndSuccess from "./ErrorAndSuccess";
import AnimationBoard from "./AnimationBoard";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
import hand from "../assets/tap.gif";
const questions = [
  {
    remainder: 2,
    numerator: 3,
    denominator: 5,
    options: ["23/5", "6/5", "11/5", "13/5"],
    correctOption: "13/5",
  },
  {
    remainder: 2,
    numerator: 1,
    denominator: 4,
    options: ["2/4", "9/4", "6/4", "21/4"],
    correctOption: "9/4",
  },
  {
    remainder: 3,
    numerator: 1,
    denominator: 6,
    options: ["31/6", "19/6", "3/6", "9/6"],
    correctOption: "19/6",
  },
  {
    remainder: 2,
    numerator: 7,
    denominator: 9,
    options: ["14/9", "25/9", "27/9", "23/9"],
    correctOption: "25/9",
  },
  {
    remainder: 5,
    numerator: 3,
    denominator: 11,
    options: ["53/11", "58/11", "15/11", "26/11"],
    correctOption: "58/11",
  },
  {
    remainder: 4,
    numerator: 3,
    denominator: 8,
    options: ["43/8", "12/8", "27/8", "20/8"],
    correctOption: "27/8",
  },
];
const Main = ({ completeActivity }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errorShow, setErrorShow] = useState(false);
  const [showNext1, setShowNext1] = useState(false);
  const [error, setError] = useState("");
  const [showMain, setShowMain] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showOption, setShowOption] = useState(true);
  const [showTapNext, setShowTapNext] = useState(true);
  const [showReplayHeading, setShowReplayHeading] = useState(false);
  const [showRestartButtonAnimation, setShowRestartButtonAnimation] =
    useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [showNextTwo, setShowNextTwo] = useState(false);
  const [optionData, setOptionData] = useState({
    numerator: null,
    denominator: null,
  });
  // Track which options have been selected (by value string)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const playCorrect = () => {
    const audio = new Audio(correct);
    audio.play();
  };
  const playWrong = () => {
    const audio = new Audio(wrong);
    audio.play();
  };
  const handleError = (numerator, denominator) => {
    let [numiratorAns, denomiratorAns] = currentQuestion.correctOption
      .split("/")
      .map(Number);
    const valueStr = `${numerator}/${denominator}`;
    setSelectedOptions((prev) =>
      prev.includes(valueStr) ? prev : [...prev, valueStr]
    );
    if (numerator === numiratorAns && denominator === denomiratorAns) {
      setOptionData({ numerator, denominator });
      playCorrect();
      setError("success");
      setShowTapNext(false);
      setErrorShow(true);
      setShowNext1(true);
    } else {
      setOptionData({ numerator, denominator });
      playWrong();
      setError("error");
      setErrorShow(true);
    }
  };

  const handleNext = () => {
    setShowMain(false);
    setShowNext1(false);
    setShowAnimation(true);
  };
  const handleRestart = () => {
    setShowOption(false);
    setShowReplayHeading(true);
    setShowRestartButtonAnimation(true);
    setShowNextTwo(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 >= questions.length) {
      if (typeof completeActivity === "function") completeActivity();
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
    setShowNext1(false);
    setShowReplayHeading(false);
    setShowNextTwo(false);
    setShowMain(true);
    setShowOption(true);
    setShowAnimation(false);
    setShowRestartButtonAnimation(false);
    setErrorShow(false);
    setShowNext1(false);
    setError("");
    setShowTapNext(true);
    setSelectedOptions([]); // Reset selected options for next question
  };

  const handleReplayAnimation = () => {
    setShowAnimation(false);
    setShowNext1(false);
    setTimeout(() => {
      setAnimationKey((prev) => prev + 1);
      setShowAnimation(true);
    }, 10);
  };
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="main-container">
      <h1 className="main-heading fade-in">
        Express the given mixed number into an improper fraction.
      </h1>
      <div className="main-content">
        <div className="fraction-part fade-in">
          {showMain && (
            <Fraction
              remainder={currentQuestion.remainder}
              numerator={currentQuestion.numerator}
              denominator={currentQuestion.denominator}
            />
          )}
          {showAnimation && (
            <AnimationBoard
              key={animationKey}
              showAniButton={handleRestart}
              remainder={currentQuestion.remainder}
              numerator={currentQuestion.numerator}
              denominator={currentQuestion.denominator}
            />
          )}
        </div>
        <div className="option-part">
          {showOption && (
            <div className="option-align">
              <div className="option-item-grid">
                {currentQuestion.options.map((option, index) => {
                  const [num, denom] = option.split("/").map(Number);
                  const valueStr = `${num}/${denom}`;
                  const isSelected = selectedOptions.includes(valueStr);
                  const isCorrect =
                    error === "success" &&
                    option === currentQuestion.correctOption;
                  const isWrong =
                    error === "error" &&
                    isSelected &&
                    option !== currentQuestion.correctOption;
                  let disabled = false;
                  if (isSelected) {
                    disabled = true;
                  } else if (error === "success") {
                    disabled = true;
                  }
                  return (
                    <Option
                      key={index}
                      numerator={num}
                      denominator={denom}
                      onClick={() => handleError(num, denom)}
                      disabled={disabled}
                      isCorrect={isCorrect}
                      isWrong={isWrong}
                      isDashed={isSelected}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {showRestartButtonAnimation && (
            <div
              className="restart-button-animation"
              style={{
                position: "relative",
              }}
            >
              <button
                className="next-btn"
                style={{
                  marginTop: "2vh",
                }}
                onClick={handleReplayAnimation}
              >
                Replay <br /> transformation
              </button>
              <img src={hand} alt="hand" className="hand-img" />
            </div>
          )}
          {errorShow && (
            <div className="fade-in">
              <ErrorAndSuccess optionData={optionData} error={error} />
            </div>
          )}
        </div>
      </div>
      <div className="footer-one">
        {showTapNext && (
          <h2 className="footer-heading">Tap the correct option.</h2>
        )}
        {showNext1 && (
          <h2 className="footer-heading">
            Tap Next to see the transformation.
          </h2>
        )}
        {showReplayHeading && (
          <h2
            className="footer-heading"
            style={{
              fontSize: "2.3vw",
            }}
          >
            Tap ‘Replay’ to see the animation again, or ‘Next’ for another
            challenge.
          </h2>
        )}
      </div>
      <div className="footer-two">
        {showNext1 && (
          <div
            style={{
              position: "relative",
            }}
          >
            <button className="next-btn" onClick={handleNext}>
              Next
            </button>
            
          </div>
        )}
        {showNextTwo && (
          <div
            style={{
              position: "relative",
            }}
          >
            <button className="next-btn" onClick={handleNextQuestion}>
              Next
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
