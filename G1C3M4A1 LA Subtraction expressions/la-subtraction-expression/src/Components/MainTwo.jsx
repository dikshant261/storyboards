import React, { useEffect, useState } from "react";
import "./Main.css";

import Keypad from "./Keypad";
import ErrorMessageKeypad from "./ErrorMessageKepad";
import Car from "./Car";
import ErrorKeypadTwo from "./ErrorKeypadTwo";

const MainTwo = ({nextTwo}) => {
  const [showKeypad, setShowKeypad] = useState(true);
  const [sideHeadingOne, setSideHeadingOne] = useState(true);
  const [sideHeadingTwo, setSideHeadingTwo] = useState(false);
  const [hintMessage, setHintMessage] = useState(false);
  const [number, setNumber] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const hintPara = `Count the total
          \n number of cars \n
          \n That number will\n
          \n show ‘how many \n
          \n car were in total.`;
  const [boxBoundary, setBoxBoundary] = useState({
    border: "0.3vw solid #666",
    backgroundColor: "#666",
    boxShadow: "inset -0.3vw -0.3vw 0.5vw #bbb, inset 0.3vw 0.3vw 0.5vw #444",
  });
  const [showErrorOne, setShowErrorOne] = useState(false);
  const [typeTwoQuestion, setTypeTwoQuestion] = useState(false);
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

  const handleCheckTwo = () => {
    if (number === null) return;
    setShowErrorOne(true);

    if (number === 6) {
      setSideHeadingOne(false);
      setSideHeadingTwo(true);
      setShowKeypad(false);
      setShowNextButton(true);
      setBoxBoundary({
        border: "0.3vw solid #38761d",
        backgroundColor: "#38761d",
        boxShadow:
          "inset -0.3vw -0.3vw 0.5vw #4b912eff, inset 0.3vw 0.3vw 0.5vw #2a431fff",
      });
    } else if (number > 6 || number < 6) {
      setBoxBoundary({
        border: "0.3vw solid #f35757ff",
        backgroundColor: "#f35757ff",
        boxShadow:
          "inset -0.3vw -0.3vw 0.5vw #c44848ff, inset 0.3vw 0.3vw 0.5vw #862f2fff",
      });
    }
  };
  const nextQuestion = () => {
    nextTwo();
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
              If 2 objects are crossed
              <br /> out of 6,
              <br /> we say that
            </p>
            <p>2 is subtracted from 6</p>
            <p>
              Subtraction Expression
              <br /> for this will be
              <br /> 6 - 2.
            </p>
          </div>
        )}
      </div>
      <div className="main-right">
        <div className="main-right-item">
          <div className="main-right-item-one">
            <div className="main-heading-align fade-slide-in-right">
              <div
                className="car-box"
                style={{
                  ...boxBoundary,
                  marginLeft: "13vw",
                }}
              >
                <p>{number}</p>
              </div>
              <div className="minus-line"></div>
              <div className="car-box">2</div>
            </div>

            <div className="fade-slide-in-right">
              <Car totalCars={6} crossCars={2} />
            </div>
          </div>
          <div className="main-right-item-two">
            {/* {showError && <div className="fade-slide-in-right"><ErrorMessage count={counter} /></div>} */}

            {/* {showCheckButton && (
              <button className="check-button fade-slide-in-right" onClick={handleCheckOne}>
                Check
              </button>
            )} */}
            {showKeypad && (
              <div
                className={`fade-slide-in-right ${
                  showKeypad ? "" : "fade-slide-in-right"
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
            {showErrorOne && <ErrorKeypadTwo count={number} />}
          </div>
        </div>
        <div className="main-right-footer">
          {sideHeadingOne && (
            <h2 className="fade-slide-in-right">
              Tap the correct number and then tap check.
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

export default MainTwo;
