import React, { useEffect } from "react";
import "./Main.css";
import Boxes from "./Boxes";
import LongDivision from "./LongDivision";
import Fraction from "./Fraction";
import ShowErrorMessage from "./ShowErrorMessage";
import MixedFraction from "./MixedFraction";

const question = [
  {
    dividend: 13,
    divisor: 5,
    option: [1, 2, 3],
    correctAnswer: 2,
  },
  {
    dividend: 9,
    divisor: 4,
    option: [2, 3, 1],
    correctAnswer: 2,
  },
  {
    dividend: 10,
    divisor: 3,
    option: [2, 3, 4],
    correctAnswer: 3,
  },
  {
    dividend: 7,
    divisor: 5,
    option: [2, 1, 3],
    correctAnswer: 1,
  },
  {
    dividend: 14,
    divisor: 4,
    option: [2, 4, 3],
    correctAnswer: 3,
  },
];
const Main = ({ activity }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [showSingleFraction, setShowSingleFraction] = React.useState(true);
  const [startDivision, setStartDivision] = React.useState(true);
  const [showTapQuotient, setShowTapQuotient] = React.useState(false);
  const [showLongDivision, setShowLongDivision] = React.useState(false);
  const [showQuotientOption, setShowQuotientOption] = React.useState(false);
  const [currentQuotient, setCurrentQuotient] = React.useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = React.useState(false);
  const [disabledOptions, setDisabledOptions] = React.useState(new Set());
  const [showError, setShowError] = React.useState(false);
  const [showNextOne, setShowNextOne] = React.useState(false);
  const [showSimplify, setShowSimplify] = React.useState(false);
  const [showSimplyAnswer, setShowSimplyAnswer] = React.useState(false);
  const [showNextTwo, setShowNextTwo] = React.useState(false);
  const [showAnimation, setShowAnimation] = React.useState(false);
  const [animationStepOne, setAnimatioStepOne] = React.useState(false);
  const [animationStepTwo, setAnimatioStepTwo] = React.useState(false);

  const handleStartDivision = () => {
    setShowLongDivision(true);
    setStartDivision(false);
    setShowTapQuotient(true);
    setShowQuotientOption(true);
  };

  const handleQuotientOption = (option) => {
    setShowError(true);
    setDisabledOptions((prev) => new Set(prev).add(option));
    if (option === currentQuestion.correctAnswer) {
      setCurrentQuotient(option);
      setShowCorrectAnswer(true);
      setShowNextOne(true);
      setShowTapQuotient(false);
    } else {
      setCurrentQuotient(option);
      setShowCorrectAnswer(false);
    }
  };
  const handleNextOne = () => {
    setShowNextOne(false);
    setShowQuotientOption(false);
    setShowError(false);
    setShowSimplify(true);
  };

  const handleNextTwo = () => {
    if (currentQuestionIndex === question.length - 1) {
      if (typeof activity === "function") activity();
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
    setShowSingleFraction(true);
    setShowAnimation(false);
    setStartDivision(true);
    setShowTapQuotient(false);
    setShowLongDivision(false);
    setShowQuotientOption(false);
    setCurrentQuotient(null);
    setShowCorrectAnswer(false);
    setDisabledOptions(new Set());
    setShowError(false);
    setShowNextOne(false);
    setShowSimplify(false);
    setShowSimplyAnswer(false);
    setShowNextTwo(false);
    setAnimatioStepOne(false);
    setAnimatioStepTwo(false);
  };

  const handleSimplify = () => {
    setShowSingleFraction(false);
    setShowSimplify(false);
    setShowSimplyAnswer(true);
    setShowAnimation(true);
  };

  useEffect(() => {
    if (showAnimation) {
      const timer1 = setTimeout(() => {
        setAnimatioStepOne(true);
      }, 2000);
      const timer2 = setTimeout(() => {
        setAnimatioStepTwo(true);
        setShowNextTwo(true);
      }, 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [showAnimation]);

  const currentQuestion = question[currentQuestionIndex];
  return (
    <div className="container">
      <div className="container-heading fade-in">
        {startDivision && (
          <h3>Every fraction can be thought of as division.</h3>
        )}
        {showQuotientOption && (
          <h3>
            How many wholes of {currentQuestion.divisor} are in{" "}
            {currentQuestion.dividend}?
          </h3>
        )}
        {showSimplify && (
          <h3>
            Let’s simplify the division problem to understand the conversion.
          </h3>
        )}
        {showSimplyAnswer && (
          <h3 className="simplified-answer fade-in">
            We have {currentQuestion.correctAnswer} wholes and a fractional{" "}
            {currentQuestion.dividend % currentQuestion.divisor} parts of{" "}
            {currentQuestion.divisor} in
            <span
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                margin: "0 0.5em",
              }}
            >
              <span style={{ display: "block", textAlign: "center" }}>
                {currentQuestion.dividend % currentQuestion.divisor}
              </span>
              <span
                style={{
                  display: "block",
                  borderTop: "2px solid #333",
                  width: "100%",
                }}
              ></span>
              <span style={{ display: "block", textAlign: "center" }}>
                {currentQuestion.divisor}
              </span>
            </span>
            .
          </h3>
        )}
      </div>
      <div className="main-content fade-in">
        <div className="main-content-item fade-in">
          <Boxes
            currentQuotient={currentQuotient}
            dividend={currentQuestion.dividend}
            divisor={currentQuestion.divisor}
            questionData={currentQuestion}
          />
        </div>

        {showLongDivision && (
          <div className="main-content-item fade-in">
            <LongDivision
              currentQuotient={currentQuotient}
              questionData={currentQuestion}
            />
          </div>
        )}
        <div className="main-content-item fade-in">
          {showSingleFraction && (
            <Fraction
              numerator={currentQuestion.dividend}
              denominator={currentQuestion.divisor}
              questionData={currentQuestion}
              currentQuotient={currentQuotient}
            />
          )}
          {showSimplyAnswer && (
            <div className="simplified-answer fade-in">
              <MixedFraction
                numerator={currentQuestion.dividend}
                denominator={currentQuestion.divisor}
              />
            </div>
          )}
        </div>
      </div>
      <div className="container-footer fade-in">
        {startDivision && (
          <div>
            <button className="footer-button" onClick={handleStartDivision}>
              Express as Division
            </button>
          </div>
        )}
        <div className="error-button-align">
          {showQuotientOption && (
            <div className="option-align fade-in">
              <button
                className="quotient-Button"
                onClick={() => handleQuotientOption(currentQuestion.option[0])}
                disabled={
                  showCorrectAnswer ||
                  disabledOptions.has(currentQuestion.option[0])
                }
              >
                {currentQuestion.option[0]}
              </button>
              <button
                className="quotient-Button"
                onClick={() => handleQuotientOption(currentQuestion.option[1])}
                disabled={
                  showCorrectAnswer ||
                  disabledOptions.has(currentQuestion.option[1])
                }
              >
                {currentQuestion.option[1]}
              </button>
              <button
                className="quotient-Button"
                onClick={() => handleQuotientOption(currentQuestion.option[2])}
                disabled={
                  showCorrectAnswer ||
                  disabledOptions.has(currentQuestion.option[2])
                }
              >
                {currentQuestion.option[2]}
              </button>
            </div>
          )}

          {showError && (
            <div className="fade-in">
              <ShowErrorMessage
                quotient={currentQuotient}
                questionData={currentQuestion}
              />
            </div>
          )}
          {showSimplify && (
            <div>
              <button className="footer-button" onClick={handleSimplify}>
                Simplify
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="container-footer-two">
        {startDivision && (
          <h4 className="container-footer-heading">
            Tap the button to explore.
          </h4>
        )}
        {showTapQuotient && (
          <h4 className="container-footer-heading">
            Enter the quotient by tapping the correct answer.
          </h4>
        )}
        {showNextOne && (
          <button className="next-btn" onClick={handleNextOne}>
            Next
          </button>
        )}
        {showNextTwo && (
          <button className="next-btn" onClick={handleNextTwo}>
            Next
          </button>
        )}
        {showNextOne && <h4 className="container-footer-heading">Tap Next.</h4>}
        {showNextTwo && (
          <h4 className="container-footer-heading">
            Tap Next For Next Challenge
          </h4>
        )}
        {showSimplify && (
          <h4 className="container-footer-heading">Tap Simplify.</h4>
        )}
      </div>

      {showAnimation && (
        <div>
          <div>
            {animationStepOne && (
              <div>
                <div className="line-1 fadeIn"></div>
                <div className="line-2 fadeIn"></div>
                <div className="line-heading-1 fadeIn">Whole</div>
              </div>
            )}
            {animationStepTwo && (
              <div>
                <div className="line-3 fadeIn"></div>
                <div className="line-4 fadeIn"></div>
                <div className="line-5 fadeIn"></div>
                <div className="line-heading-2">Fraction</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
