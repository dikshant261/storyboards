import React, { useEffect, useState } from "react";
import "./Main.css";

import Keypad from "./Keypad";
import ErrorMessageKeypad from "./ErrorMessageKepad";
import Car from "./Car";
import TotalCarError from "./TotalCarError";
import CrossCarError from "./CrossCarError";
const question = [
  { totalCars: 8, crossCars: 5 },
  { totalCars: 4, crossCars: 4 },
  {
    totalCars: 7,
    crossCars: 6,
  },
];
const MainThree = ({ onNext, currentQuestion }) => {
  const [showKeypadOne, setShowKeypadOne] = useState(true);
  const [showKeypadTwo, setShowKeypadTwo] = useState(false);
  const [sideHeadingOne, setSideHeadingOne] = useState(true);
  const [sideHeadingTwo, setSideHeadingTwo] = useState(false);
  const [hintMessage, setHintMessage] = useState(false);
  const [number, setNumber] = useState(null);
  const [tapZero, setTapZero] = useState(true);
  const [tapOne, setTapOne] = useState(false);
  const [nextCross, setNextCross] = useState(false);
  const [numberTwo, setNumberTwo] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const hintPara = `Count the total \n cars and cars that \n are crossed to\n write the\n subtraction \nsentence.`;
  const [boxBoundary, setBoxBoundary] = useState({
    border: "0.3vw solid #666",
    backgroundColor: "#666",
    boxShadow: "inset -0.3vw -0.3vw 0.5vw #bbb, inset 0.3vw 0.3vw 0.5vw #444",
  });
  const [boxBoundaryCross, setBoxBoundaryCross] = useState({
    border: "0.3vw solid #666",
    backgroundColor: "#666",
    boxShadow: "inset -0.3vw -0.3vw 0.5vw #bbb, inset 0.3vw 0.3vw 0.5vw #444",
  });

  const [showErrorOne, setShowErrorOne] = useState(false);
  const [showErrorOneTwo, setShowErrorTwo] = useState(false);
  const handleNumber = (num) => {
    setNumber(num);
    setHintMessage(false);
    setShowErrorOne(false);
    setBoxBoundary({
      border: "0.3vw solid #666",
      backgroundColor: "#666",
      boxShadow: "inset -0.3vw -0.3vw 0.5vw #bbb, inset 0.3vw 0.3vw 0.5vw #444",
    });
  };
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowArrow(true);
    }, 1500);

    return () => {
      clearTimeout(timer1);
    };
  }, []);
  const handleCheckTwo = () => {
    if (number === null) return;
    setShowErrorOne(true);

    if (number === currentQuestion.totalCars) {
      setShowKeypadOne(false);
      setTapZero(false);
      setNextCross(true);
      setBoxBoundary({
        border: "0.3vw solid #38761d",
        backgroundColor: "#38761d",
        boxShadow:
          "inset -0.3vw -0.3vw 0.5vw #4b912eff, inset 0.3vw 0.3vw 0.5vw #2a431fff",
      });
    } else if (
      number > currentQuestion.totalCars ||
      number < currentQuestion.totalCars
    ) {
      setBoxBoundary({
        border: "0.3vw solid #f35757ff",
        backgroundColor: "#f35757ff",
        boxShadow:
          "inset -0.3vw -0.3vw 0.5vw #c44848ff, inset 0.3vw 0.3vw 0.5vw #862f2fff",
      });
    }
  };
  const handleNextOne = () => {
    setNextCross(false);
    setTapOne(true);
    setShowKeypadTwo(true);
  };
  const handleNumberCross = (num) => {
    setNumberTwo(num);
    setHintMessage(false);
    setShowErrorTwo(false);
    setBoxBoundaryCross({
      border: "0.3vw solid #666",
      backgroundColor: "#666",
      boxShadow: "inset -0.3vw -0.3vw 0.5vw #bbb, inset 0.3vw 0.3vw 0.5vw #444",
    });
  };
  const handleCheckThree = () => {
    if (numberTwo === null) return;
    setShowErrorTwo(true);

    if (numberTwo === currentQuestion.crossCars) {
      setShowKeypadTwo(false);
      setSideHeadingOne(false);
      setSideHeadingTwo(true);
      setShowNextButton(true);
      setTapOne(false);
      setBoxBoundaryCross({
        border: "0.3vw solid #38761d",
        backgroundColor: "#38761d",
        boxShadow:
          "inset -0.3vw -0.3vw 0.5vw #4b912eff, inset 0.3vw 0.3vw 0.5vw #2a431fff",
      });
    } else if (
      numberTwo > currentQuestion.crossCars ||
      numberTwo < currentQuestion.crossCars
    ) {
      setBoxBoundaryCross({
        border: "0.3vw solid #f35757ff",
        backgroundColor: "#f35757ff",
        boxShadow:
          "inset -0.3vw -0.3vw 0.5vw #c44848ff, inset 0.3vw 0.3vw 0.5vw #862f2fff",
      });
    }
  };
  const nextQuestion = () => {
    
    
    setSideHeadingTwo(false);
    setShowNextButton(false);
    setShowErrorOne(false);
    setShowErrorTwo(false);
    setBoxBoundaryCross({
      border: "0.3vw solid #666",
      backgroundColor: "#666",
      boxShadow: "inset -0.3vw -0.3vw 0.5vw #bbb, inset 0.3vw 0.3vw 0.5vw #444",
    });
    setBoxBoundary({
      border: "0.3vw solid #666",
      backgroundColor: "#666",
      boxShadow: "inset -0.3vw -0.3vw 0.5vw #bbb, inset 0.3vw 0.3vw 0.5vw #444",
    });
    setNumber(null);
    setNumberTwo(null);
    setSideHeadingOne(true);
    setShowKeypadOne(true);
    setTapZero(true);
    onNext();
  };
  
  return (
    <div className="main-container">
      <div className="main-left">
        <div className="fade-slide-in-right">
          {sideHeadingOne && (
            <div>
              <p>
                There are many cars in
                <br /> picture. Some of the
                <br /> cars are crossed
                <br /> showing subtraction.
              </p>
              <p>
                Count and complete
                <br /> the subtraction
                <br /> sentence given along
                <br /> with the picture
              </p>
            </div>
          )}
        </div>

        {sideHeadingTwo && (
          <div className="fade-slide-in-right">
            <p>
              If {currentQuestion.crossCars} objects are crossed
              <br /> out of {currentQuestion.totalCars},
              <br /> we say that
            </p>
            <p>
              {currentQuestion.crossCars} is subtracted from{" "}
              {currentQuestion.totalCars}
            </p>
            <p>
              Subtraction Expression
              <br /> for this will be
              <br /> {currentQuestion.totalCars} - {currentQuestion.crossCars}.
            </p>
          </div>
        )}
      </div>
      <div className="main-right">
        <div className="main-right-item">
          <div className="main-right-item-one">
            <div
              className="main-heading-align fade-slide-in-right"
              style={{ position: "relative" }}
            >
              {showArrow && (
                <div
                  className="show-on"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "39%",
                    width: "15%",
                    height: "15%",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="10.9 8.9 1.2 1.2"
                  >
                    <path
                      d="M 12 9 Q 11 9 11 10"
                      stroke="gold"
                      stroke-width="0.08"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
              {showArrow && (
                <div
                  className="show-on"
                  style={{
                    position: "absolute",
                    top: "85%",
                    right: "-19%",
                    width: "15%",
                    height: "15%",
                    transform: "rotate(97deg)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="10.9 8.9 1.2 1.2"
                  >
                    <path
                      d="M 12 9 Q 11 9 11 10"
                      stroke="gold"
                      stroke-width="0.08"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
              {showArrow && (
                <div
                  className="show-on"
                  style={{
                    position: "absolute",
                    top: "127%",
                    left: "29%",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "1.5vw",
                      padding: "0.1vw",
                      border: "0.2vw solid gold",
                    }}
                  >
                    Total Cars
                  </p>
                </div>
              )}
              {showArrow && (
                <div
                  className="show-on"
                  style={{
                    position: "absolute",
                    top: "127%",
                    right: "-29%",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "1.5vw",
                      padding: "0.1vw",
                      border: "0.2vw solid gold",
                    }}
                  >
                    Cross Car
                  </p>
                </div>
              )}
              <div
                className="car-box"
                style={{
                  ...boxBoundary,
                  marginLeft: "13vw",
                }}
              >
                {number}
              </div>
              <div className="minus-line"></div>
              <div className="car-box" style={boxBoundaryCross}>
                {numberTwo}
              </div>
            </div>

            <div className="fade-slide-in-right">
              <Car
                totalCars={currentQuestion.totalCars}
                crossCars={currentQuestion.crossCars}
              />
            </div>
          </div>
          <div className="main-right-item-two">
            {/* {showError && <div className="fade-slide-in-right"><ErrorMessage count={counter} /></div>} */}

            {/* {showCheckButton && (
              <button className="check-button fade-slide-in-right" onClick={handleCheckOne}>
                Check
              </button>
            )} */}

            {showKeypadOne && (
              <div
                className={`fade-slide-in-right ${
                  showKeypadOne ? "" : "fade-slide-in-right"
                }`}
              >
                <Keypad
                  hintMessage={hintMessage}
                  hintPara={hintPara}
                  setHintMessage={() => setHintMessage(true)}
                  setNumber={handleNumber}
                  handleCheckTwo={handleCheckTwo}
                />
              </div>
            )}
            {showKeypadTwo && (
              <div
                className={`fade-slide-in-right ${
                  showKeypadTwo ? "" : "fade-slide-in-right"
                }`}
              >
                <Keypad
                  hintMessage={hintMessage}
                  hintPara={hintPara}
                  setHintMessage={() => setHintMessage(true)}
                  setNumber={handleNumberCross}
                  handleCheckTwo={handleCheckThree}
                />
              </div>
            )}
            {showErrorOne && (
              <TotalCarError
                count={number}
                totalCar={currentQuestion.totalCars}
              />
            )}
            {showErrorOneTwo && (
              <CrossCarError
                count={numberTwo}
                crossCar={currentQuestion.crossCars}
              />
            )}
          </div>
        </div>
        <div className="main-right-footer">
          {tapZero && (
            <h2 className="fade-slide-in-right">
              Tap the correct number of total cars and then tap check.
            </h2>
          )}
          {nextCross && <h2 className="fade-slide-in-right">Tap Next...</h2>}
          {tapOne && (
            <h2 className="fade-slide-in-right">
              Tap the correct number of cross cars and then tap check.
            </h2>
          )}
          {sideHeadingTwo && (
            <h2 className="fade-slide-in-right">
              {" "}
              Tap ▶ for the next challenge…
            </h2>
          )}
        </div>
        <div className="main-right-footer-two">
          {nextCross && (
            <button
              className="next-button fade-slide-in-right"
              onClick={handleNextOne}
            >
              ▶
            </button>
          )}
          {showNextButton && (
            <button
              className="next-button fade-slide-in-right"
              onClick={nextQuestion}
            >
              ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainThree;
