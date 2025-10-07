import React from "react";
import "./Main.css";
import Fraction from "./Fraction";
import Division from "./Division";
import MixedFraction from "./MixedFraction";
import Quotient from "./Quotient";
import ErrorMessage from "./ErrorMessage";
import RemainderError from "./ReamainderError";
import LongDivision from "./LongDivision";
import FractionNumber from "./FractionNumber";
import ReactDOM from "react-dom";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
import hand from '../assets/tap.gif';
const FlyNumberOverlay = ({ sourceId, targetId, value }) => {
  const [style, setStyle] = React.useState({ display: "none" });

  React.useEffect(() => {
    const src = document.getElementById(sourceId);
    const tgt = document.getElementById(targetId);
    if (!src || !tgt) return;

    const srcRect = src.getBoundingClientRect();
    const tgtRect = tgt.getBoundingClientRect();

    const startX = srcRect.left + srcRect.width / 2;
    const startY = srcRect.top + srcRect.height / 2;
    const endX = tgtRect.left + tgtRect.width / 2;
    const endY = tgtRect.top + tgtRect.height / 2;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    setStyle({
      position: "fixed",
      left: startX,
      top: startY,
      transform: "translate(-50%, -50%)",
      color: "white",
      fontSize: "2.8vw",
      zIndex: 9999,
      animation: "flyNumber 1s cubic-bezier(0.22,1,0.36,1) forwards",
      // custom properties for keyframes
      "--num-dx": `${deltaX}px`,
      "--num-dy": `${deltaY}px`,
      display: "block",
      pointerEvents: "none",
    });
  }, [sourceId, targetId]);

  return ReactDOM.createPortal(
    <div style={style}>{value}</div>,
    document.body
  );
};
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
  const [startFractionAnim, setStartFractionAnim] = React.useState(false);
  const [showMixedNumber, setShowMixedNumber] = React.useState(false);
  const [flyDivisor, setFlyDivisor] = React.useState(false);
  const [flyQuotient, setFlyQuotient] = React.useState(false);
  const [flyRemainder, setFlyRemainder] = React.useState(false);
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
  const [disabledQuotientOptions, setDisabledQuotientOptions] = React.useState(
    []
  );
  const [disabledRemainderOptions, setDisabledRemainderOptions] =
    React.useState([]);
  const [wrongQuotientOptions, setWrongQuotientOptions] = React.useState([]);
  const [wrongRemainderOptions, setWrongRemainderOptions] = React.useState([]);
  const [selectedCurrentQuestion, setSelectedCurrentQuestion] =
    React.useState(null);
    const playCorrect = () => {
      const audio = new Audio(correct);
      audio.play();
    };
    const playWrong = () => {
      const audio = new Audio(wrong);
      audio.play();
    };  
  const handleDivideClick = () => {
    setShowDivideButton(false);
    setShowTapHeading(false);
    setShowNextOne(true);
    // Let the fraction line animate first, then reveal Division
    const animationMs = 900; // should match --fly-duration default
    setStartFractionAnim(true);
    setTimeout(() => {
      setShowDivision(true);
      setStartFractionAnim(false);
    }, animationMs);
  };
  const handleNextOne = () => {
    setShowNextOne(false);
    setShowMixedNumber(true);
    setQuotientOptionShow(true);
    setTapQuotient(true);
    setMainHeadingOneShow(false);
    setMainHeadingTwoShow(true);
    // Trigger divisor fly animation shortly after Mixed Number appears
    setTimeout(() => setFlyDivisor(true), 50);
    setTimeout(() => {
      setFlyDivisor(false);
      // brief highlight on arrival
      const denom = document.getElementById("mixed-denominator");
      if (denom) {
        denom.classList.remove("highlight");
        // force reflow to restart animation if needed
        void denom.offsetWidth;
        denom.classList.add("highlight");
      }
    }, 1200);
  };
  const handleQuotientOptionClick = (option) => {
    if (disabledQuotientOptions.includes(option)) return; // Already disabled
    if (selectedQuotientOption === currentQuestion.rightQuotient) return; // Already correct
    setSelectedQuotientOption(option);
    if (option !== currentQuestion.rightQuotient) {
      playWrong()
      setWrongQuotientOptions((prev) => [...prev, option]);
      setDisabledQuotientOptions((prev) => [...prev, option]);
      setTimeout(() => {
        setWrongQuotientOptions((prev) => prev.filter((o) => o !== option));
      }, 800);
    } else {
      setDisabledQuotientOptions([...currentQuestion.quotient]);
      playCorrect()
      // Trigger immediate quotient fly when correct and Mixed Number is visible
      if (showMixedNumber) {
        setFlyQuotient(true);
        setTimeout(() => {
          setFlyQuotient(false);
          const mq = document.getElementById("mixed-quotient");
          if (mq) {
            mq.classList.remove("highlight");
            void mq.offsetWidth;
            mq.classList.add("highlight");
          }
        }, 1200);
      }
    }
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
    if (disabledRemainderOptions.includes(option)) return; // Already disabled
    if (selectedRemainderOption === currentQuestion.rightRemainder) return; // Already correct
    setSelectedRemainderOption(option);
    if (option !== currentQuestion.rightRemainder) {
      playWrong();
      setWrongRemainderOptions((prev) => [...prev, option]);
      setDisabledRemainderOptions((prev) => [...prev, option]);
      setTimeout(() => {
        setWrongRemainderOptions((prev) => prev.filter((o) => o !== option));
      }, 800);
    } else {
      setDisabledRemainderOptions([...currentQuestion.remainder]);
      playCorrect();
    }
    setRemainderErrorMessage(true);
    // Trigger immediate fly when correct
    if (option === currentQuestion.rightRemainder && showMixedNumber) {
      setFlyRemainder(true);
      setTimeout(() => {
        setFlyRemainder(false);
        const mr = document.getElementById("mixed-remainder");
        if (mr) {
          mr.classList.remove("highlight");
          void mr.offsetWidth;
          mr.classList.add("highlight");
        }
      }, 1200);
    }
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
    setDisabledQuotientOptions([]);
    setDisabledRemainderOptions([]);
    setWrongQuotientOptions([]);
    setWrongRemainderOptions([]);
    setSelectedCurrentQuestion(null);
    setMainHeadingOneShow(true);
    setMainHeadingTwoShow(false);
  };
  const currentQuestion = question[questionIndex];
  return (
    <div className="main-container">
      {mainHeadingOneShow && (
        <h3 className="h3-heading ">
          Let’s convert the given fraction into a mixed number using division.
        </h3>
      )}
      {mainHeadingTwoShow && (
        <h3 className="h3-heading ">
          Divide {currentQuestion.dividend} by {currentQuestion.divisor}. Notice
          how the fraction is represented as a mixed number.
        </h3>
      )}
      <div className="main-content ">
        <div className="main-content-items">
          <div className="left-fraction">
            <h3 className="improper-heading">Improper Fraction</h3>
            <div className="" style={{
              position:"relative"
            }}>
              <Fraction
                numerator={currentQuestion.dividend}
                denominator={currentQuestion.divisor}
                startAnimation={startFractionAnim}
              />
            </div>
          </div>
        </div>
        <div className="main-content-items" style={{ position: "relative" }}>
          {/* Always-present invisible target for the flying fraction line */}
          <div
            id="division-line-target"
            style={{
              position: "absolute",
              top: "6vh",
              left: "-3vw",
              width: 1,
              height: 1,
              pointerEvents: "none",
              opacity: 0,
            }}
          />
          {showDivision && (
            <div className="left-fraction ">
              <h3
                className="improper-heading"
                style={{
                  marginBottom: "8vh",
                }}
              >
                Division
              </h3>
              <div className="" style={{ position: "relative" }}>
                {/* Target for flying line to aim to */}
                <div id="division-line-target" style={{ position: "absolute", top: "2.8vw", left: "-6vw", width: "1px", height: "1px", pointerEvents: "none", opacity: 0 }}></div>
                {/* <Division
                  quotient={selectedQuotientOption}
                  questionData={currentQuestion}
                  remainder={selectedRemainderOption}
                  handleQuotient={handleNextStepQuotient}
                  handleRemainder={handleRemainderNextHeading}
                /> */}
                <LongDivision
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
        <div className="main-content-items" style={{ position: "relative" }}>
          {showMixedNumber && (
            <div className="left-fraction ">
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
          {/* Flying divisor overlay */}
          {flyDivisor && (
            <FlyNumberOverlay sourceId="long-division-divisor" targetId="mixed-denominator" value={currentQuestion.divisor} />
          )}
          {/* Flying quotient overlay */}
          {flyQuotient && (
            <FlyNumberOverlay sourceId="long-division-quotient" targetId="mixed-quotient" value={selectedQuotientOption ?? ''} />
          )}
          {/* Flying remainder overlay */}
          {flyRemainder && (
            <FlyNumberOverlay sourceId="long-division-remainder" targetId="mixed-remainder" value={selectedRemainderOption ?? ''} />
          )}
        </div>
      </div>
      <div className="footer-1">
        {showDivideButton && (
          <div style={{
            position:"relative"
          }}>
          <button className="footer-button " onClick={handleDivideClick}
          
          >
            <svg
              width="6vw"
              height="4vw"
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="28" r="10" fill="white" />
              <rect
                x="15"
                y="55"
                width="90"
                height="10"
                rx="5"
                fill="white"
              />
              <circle cx="60" cy="92" r="10" fill="white" />
            </svg>
          </button>
          <img src={hand} alt="hand" className="hand-img-1" />
          </div>
        )}
        {showNextOne && (
          <button className="next-button " onClick={handleNextOne}>
            Next
          </button>
        )}
        {showNextTwo && (
          <button className="next-button " onClick={handleNextTwo}>
            Next
          </button>
        )}
        {showNextThree && (
          <button className="next-button " onClick={handleNextThree}>
            Next
          </button>
        )}
        {showNextFour && (
          <button className="next-button " onClick={handleNextFour}>
            Next
          </button>
        )}
        {showNextOne && (
          <h3
            className="improper-heading-2 "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5vw",
              fontSize: "2vw",
            }}
          >
            The fraction{" "}
            <span className="align-ans">
              <span>{currentQuestion.dividend}</span>
              <span className="ans-line"></span>
              <span>{currentQuestion.divisor}</span>
            </span>{" "}
            means <span>{currentQuestion.dividend}</span> divided by{" "}
            <span>{currentQuestion.divisor}</span>.
          </h3>
        )}
        {quotientOptionShow && (
          <div>
            <div className="options ">
              {currentQuestion.quotient.map((option, index) => {
                let isDisabled =
                  disabledQuotientOptions.includes(option) ||
                  selectedQuotientOption === currentQuestion.rightQuotient;
                let isWrong = wrongQuotientOptions.includes(option);
                let isCorrect =
                  selectedQuotientOption === option &&
                  option === currentQuestion.rightQuotient;
                let style = {
                  minWidth: "6vw",
                  minHeight: "4vw",
                  fontSize: "3vw",
                  margin: "0.5vw",
                  borderRadius: "0.4vw",
                  border: "0.2vw solid white",
                };
                if (isCorrect) {
                  style.backgroundColor = "var(--success-second-color)";
                  style.color = "white";
                } else if (isDisabled) {
                  style.backgroundColor = isWrong ? "red" : "lightgray";
                  style.color = isWrong ? "white" : "black";
                }
                return (
                  <button
                    key={index}
                    className="quotient-option-btn"
                    style={style}
                    disabled={isDisabled}
                    onClick={() => handleQuotientOptionClick(option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {showRemainderOption && (
          <div>
            <div className="options ">
              {currentQuestion.remainder.map((option, index) => {
                let isDisabled =
                  disabledRemainderOptions.includes(option) ||
                  selectedRemainderOption === currentQuestion.rightRemainder;
                let isWrong = wrongRemainderOptions.includes(option);
                let isCorrect =
                  selectedRemainderOption === option &&
                  option === currentQuestion.rightRemainder;
                let style = {
                  minWidth: "6vw",
                  minHeight: "4vw",
                  fontSize: "3vw",
                  margin: "0.5vw",
                  borderRadius: "0.5vw",
                  border: "0.2vw solid white",
                };
                if (isCorrect) {
                  style.backgroundColor = "var(--success-second-color)";
                  style.color = "white";
                } else if (isDisabled) {
                  style.backgroundColor = isWrong ? "red" : "lightgray";
                  style.color = isWrong ? "white" : "black";
                }
                return (
                  <button
                    key={index}
                    className="remainder-option-btn"
                    style={style}
                    disabled={isDisabled}
                    onClick={() => handleRemainderOptionClick(option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {errorMessageShow && (
          <div className="">
            <ErrorMessage
              quotient={selectedQuotientOption}
              questionData={currentQuestion}
            />
          </div>
        )}
        {remainderErrorMessage && (
          <div className="">
            <RemainderError
              remainder={selectedRemainderOption}
              questionData={currentQuestion}
            />
          </div>
        )}
        {successHeadingShow && (
          <div className="improper-heading-2 ">
            <h3
              className="success-heading-align"
              style={{
                fontSize: "2vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1vw",
                fontSize: "2.3vw",
              }}
            >
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
          <h3 className="improper-heading-2 ">
            Tap the button to divide
          </h3>
        )}
        {showNextOne && (
          <h3 className="improper-heading-2 ">Tap Next to proceed.</h3>
        )}
        {tapQuotient && (
          <h3 className="improper-heading-2 ">
            Tap the correct quotient.
          </h3>
        )}
        {tapNextTwo && <h3 className="improper-heading-2 ">Tap Next</h3>}
        {tapRemainder && (
          <h3 className="improper-heading-2 ">
            Tap the correct remainder.
          </h3>
        )}
        {tapNextThree && (
          <h3 className="improper-heading-2 ">Tap Next</h3>
        )}
      </div>
      {/* <div className="footer-2"></div> */}
    </div>
  );
};

export default Main;
