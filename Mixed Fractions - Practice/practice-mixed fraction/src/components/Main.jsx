import React from "react";
import "./Main.css";
import Fraction from "./Fraction";
import Division from "./Division";
import MixedFraction from "./MixedFraction";
import Quotient from "./Quotient";
import ErrorMessage from "./ErrorMessage";
import RemainderError from "./ReamainderError";
const question = [
  {
    dividend: 18,
    divisor: 7,
    quotient: [1, 2, 3],
    remainder: [5, 3, 4],
    rightQuotient: 2,
    rightRemainder: 4,
  },
  {
    dividend: 20,
    divisor: 6,
    quotient: [5, 2, 3],
    remainder: [3, 2, 1],
    rightQuotient: 3,
    rightRemainder: 2,
  },
  {
    dividend: 25,
    divisor: 4,
    quotient: [5, 8, 6],
    remainder: [1, 3, 2],
    rightQuotient: 6,
    rightRemainder: 1,
  },
  {
    dividend: 75,
    divisor: 9,
    quotient: [5, 8, 6],
    remainder: [1, 3, 2],
    rightQuotient: 8,
    rightRemainder: 3,
  },
  {
    dividend: 59,
    divisor: 11,
    quotient: [9, 5, 3],
    remainder: [5, 7, 4],
    rightQuotient: 5,
    rightRemainder: 4,
  },
  {
    dividend: 64,
    divisor: 7,
    quotient: [7, 9, 5],
    remainder: [5, 1, 3],
    rightQuotient: 9,
    rightRemainder: 1,
  },
];
const Main = ({ completeActivity }) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [showDivideButton, setShowDivideButton] = React.useState(true);
  const [showDivision, setShowDivision] = React.useState(false);
  const [showMixedNumber, setShowMixedNumber] = React.useState(false);
  const [showTapHeading, setShowTapHeading] = React.useState(true);
  const [showNextOne, setShowNextOne] = React.useState(false);
  const [quotientOptionShow, setQuotientOptionShow] = React.useState(false);
  const [errorMessageShow, setErrorMessageShow] = React.useState(false);
  const [tapQuotient, setTapQuotient] = React.useState(false);
  const [tapNextTwo, setTapNextTwo] = React.useState(false);
  const [showNextTwo, setShowNextTwo] = React.useState(false);
  const [tapRemainder, setTapRemainder] = React.useState(false);
  const [showRemainderOption, setShowRemainderOption] = React.useState(false);
  const [showNextThree, setShowNextThree] = React.useState(false);
  const [tapNextThree, setTapNextThree] = React.useState(false);
  const [successHeadingShow, setSuccessHeadingShow] = React.useState(false);
  const [showNextFour, setShowNextFour] = React.useState(false);
  const [mainHeadingOneShow, setMainHeadingOneShow] = React.useState(true);
  const [mainHeadingTwoShow, setMainHeadingTwoShow] = React.useState(false);
  const [remainderErrorMessage, setRemainderErrorMessage] =
    React.useState(false);
  const [selectedRemainderOption, setSelectedRemainderOption] =
    React.useState(null);
  const [selectedQuotientOption, setSelectedQuotientOption] =
    React.useState(null);
  const [selectedCurrentQuestion, setSelectedCurrentQuestion] =
    React.useState(null);
  const handleDivideClick = () => {
    setShowDivision(true);
    setShowDivideButton(false);
    setShowTapHeading(false);
    setShowNextOne(true);
  };
  const handleNextOne = () => {
    setShowNextOne(false);
    setShowMixedNumber(true);
    setQuotientOptionShow(true);
    setTapQuotient(true);
    setMainHeadingOneShow(false);
    setMainHeadingTwoShow(true);
  };
  const handleQuotientOptionClick = (option) => {
    setSelectedQuotientOption(option);
    setErrorMessageShow(true);
  };
  const handleNextStepQuotient = () => {
    setShowNextTwo(true);
    setTapQuotient(false);
    setTapNextTwo(true);
  };
  const handleNextTwo = () => {
    setQuotientOptionShow(false);
    setErrorMessageShow(false);
    setShowNextTwo(false);
    setTapNextTwo(false);
    setShowRemainderOption(true);
    setTapRemainder(true);
  };
  const handleRemainderOptionClick = (option) => {
    setSelectedRemainderOption(option);
    setRemainderErrorMessage(true);
  };
  const handleRemainderNextHeading = () => {
    setTapRemainder(false);
    setShowNextThree(true);
    setTapNextThree(true);
  };
  const handleNextThree = () => {
    setShowRemainderOption(false);
    setShowNextThree(false);
    setSuccessHeadingShow(true);
    setRemainderErrorMessage(false);
    setShowNextFour(true);
  };

  const handleNextFour = () => {
    if (questionIndex + 1 >= question.length) {
      completeActivity();
      return;
    }
    setQuestionIndex((prev) => prev + 1);
    // Reset all relevant state for the next question
    setShowDivideButton(true);
    setShowDivision(false);
    setShowMixedNumber(false);
    setShowTapHeading(true);
    setShowNextOne(false);
    setQuotientOptionShow(false);
    setErrorMessageShow(false);
    setTapQuotient(false);
    setTapNextTwo(false);
    setShowNextTwo(false);
    setTapRemainder(false);
    setShowRemainderOption(false);
    setShowNextThree(false);
    setTapNextThree(false);
    setSuccessHeadingShow(false);
    setShowNextFour(false);
    setRemainderErrorMessage(false);
    setSelectedRemainderOption(null);
    setSelectedQuotientOption(null);
    setSelectedCurrentQuestion(null);
    setMainHeadingOneShow(true);
    setMainHeadingTwoShow(false);
  };
  const currentQuestion = question[questionIndex];
  return (
    <div className="main-container">
      {mainHeadingOneShow && (
        <h1 className="main-heading fadeIn">
          Let’s convert the given fraction into a mixed number using division.
        </h1>
      )}
      {mainHeadingTwoShow && (
        <h1 className="main-heading fadeIn">
          Divide {currentQuestion.dividend} by {currentQuestion.divisor}. Notice
          how the fraction is represented as a mixed number.
        </h1>
      )}
      <div className="main-content ">
        <div className="main-content-items">
          <div className="left-fraction">
            <h3 className="improper-heading">Improper Fraction</h3>
            <div className="fadeIn">
              <Fraction
                numerator={currentQuestion.dividend}
                denominator={currentQuestion.divisor}
              />
            </div>
          </div>
        </div>
        <div className="main-content-items">
          {showDivision && (
            <div className="left-fraction fadeIn">
              <h3
                className="improper-heading"
                style={{
                  marginBottom: "8vh",
                }}
              >
                Division
              </h3>
              <div className="fadeIn">
                <Division
                  quotient={selectedQuotientOption}
                  questionData={currentQuestion}
                  remainder={selectedRemainderOption}
                  handleQuotient={handleNextStepQuotient}
                  handleRemainder={handleRemainderNextHeading}
                />
              </div>
            </div>
          )}
        </div>
        <div className="main-content-items">
          {showMixedNumber && (
            <div className="left-fraction fadeIn">
              <h3 className="improper-heading">Mixed Number</h3>
              <div>
                <MixedFraction
                  quotient={selectedQuotientOption}
                  numerator={0}
                  denominator={currentQuestion.divisor}
                  questionData={currentQuestion}
                  remainder={selectedRemainderOption}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="footer-1">
        {showDivideButton && (
          <button className="footer-button fadeIn" onClick={handleDivideClick}>
            <svg
              width="2vw"
              height="2vw"
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="28" r="10" fill="currentColor" />
              <rect
                x="15"
                y="55"
                width="90"
                height="10"
                rx="5"
                fill="currentColor"
              />
              <circle cx="60" cy="92" r="10" fill="currentColor" />
            </svg>
          </button>
        )}
        {showNextOne && (
          <button className="next-button fadeIn" onClick={handleNextOne}>
            Next
          </button>
        )}
        {showNextTwo && (
          <button className="next-button fadeIn" onClick={handleNextTwo}>
            Next
          </button>
        )}
        {showNextThree && (
          <button className="next-button fadeIn" onClick={handleNextThree}>
            Next
          </button>
        )}
        {showNextFour && (
          <button className="next-button fadeIn" onClick={handleNextFour}>
            Next
          </button>
        )}
        {showNextOne && (
          <h3 className="improper-heading-2 fadeIn">
            The fraction{" "}
            <span>
              {currentQuestion.dividend}/{currentQuestion.divisor}
            </span>{" "}
            means <span>{currentQuestion.dividend}</span> divided by{" "}
            <span>{currentQuestion.divisor}</span>.
          </h3>
        )}
        {quotientOptionShow && (
          <div>
            <div className="options fadeIn">
              {currentQuestion.quotient.map((option, index) => (
                <Quotient
                  key={index}
                  quotientOption={option}
                  questionData={currentQuestion}
                  quotient={selectedQuotientOption}
                  onClick={() => {
                    handleQuotientOptionClick(option);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {showRemainderOption && (
          <div>
            <div className="options fadeIn">
              {currentQuestion.remainder.map((option, index) => (
                <Quotient
                  key={index}
                  quotientOption={option}
                  onClick={() => {
                    handleRemainderOptionClick(option);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {errorMessageShow && (
          <div className="fadeIn">
            <ErrorMessage
              quotient={selectedQuotientOption}
              questionData={currentQuestion}
            />
          </div>
        )}
        {remainderErrorMessage && (
          <div className="fadeIn">
            <RemainderError
              remainder={selectedRemainderOption}
              questionData={currentQuestion}
            />
          </div>
        )}
        {successHeadingShow && (
          <div className="improper-heading-2 fadeIn">
            <h3 className="success-heading-align">
              The mixed number representation of
              <span className="align-ans">
                <span>{currentQuestion.dividend}</span>
                <span className="ans-line"></span>
                <span>{currentQuestion.divisor}</span>
              </span>
              is
              <span className="align-ans-col">
                <span>{currentQuestion.rightQuotient}</span>
                <span className="align-ans">
                  <span>{currentQuestion.rightRemainder}</span>
                  <span className="ans-line"></span>
                  <span>{currentQuestion.divisor}</span>
                </span>
              </span>
            </h3>
          </div>
        )}
      </div>
      <div className="footer-2">
        {showTapHeading && (
          <h3 className="improper-heading-2 fadeIn">Tap the button to divide</h3>
        )}
        {showNextOne && (
          <h3 className="improper-heading-2 fadeIn">Tap Next to proceed.</h3>
        )}
        {tapQuotient && (
          <h3 className="improper-heading-2 fadeIn">Tap the correct quotient.</h3>
        )}
        {tapNextTwo && <h3 className="improper-heading-2 fadeIn">Tap Next</h3>}
        {tapRemainder && (
          <h3 className="improper-heading-2 fadeIn">Tap the correct remainder.</h3>
        )}
        {tapNextThree && <h3 className="improper-heading-2 fadeIn">Tap Next</h3>}
      </div>
    </div>
  );
};

export default Main;
