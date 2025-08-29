import React, { useEffect, useState } from "react";
import "./Main.css";
import CarTwo from "./CarTwo";
import ErrorMessage from "./ErrorMessage";
import Keypad from "./Keypad";
import ErrorMessageKeypad from "./ErrorMessageKepad";

const Main = () => {
  const [counter, setCounter] = useState(0);
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [sideHeadingOne, setSideHeadingOne] = useState(false);
  const [showBoxHeading, setShowBoxHeading] = useState(false);
  const [sideHeadingTwo, setSideHeadingTwo] = useState(false);
  const [hintMessage, setHintMessage] = useState(false);
  const [number, setNumber] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [boxBoundary, setBoxBoundary] = useState({
    border: "0.3vw solid #666",
    backgroundColor: "#666",
    boxShadow: "inset -0.3vw -0.3vw 0.5vw #bbb, inset 0.3vw 0.3vw 0.5vw #444",
  });
  const [carButtonsDisabled, setCarButtonsDisabled] = useState(false);
  const [showErrorOne, setShowErrorOne] = useState(false);
  const handleCheckOne = () => {
    if (counter === 3) {
      setShowKeypad(true);
      setShowBoxHeading(true);
      setShowError(false);
      setShowCheckButton(false);
      setSideHeadingOne(true);
      setCarButtonsDisabled(true);
    }
    setShowError(true);
  };

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
    setShowErrorOne(true);

    if (number === 2) {
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
    } else if (number > 2 || number < 2) {
      setBoxBoundary({
        border: "0.3vw solid #f35757ff",
        backgroundColor: "#f35757ff",
        boxShadow:
          "inset -0.3vw -0.3vw 0.5vw #c44848ff, inset 0.3vw 0.3vw 0.5vw #862f2fff",
      });
    }
  };
  return (
    <div className="main-container">
      <div className="main-left">
        {showCheckButton && (
          <div className="fade-slide-in-right">
            <p>Subtraction is ‘removing objects from a group.’</p>
            <p>
              Step 1:
              <br /> Remove 3 out of 5 objects shown.
            </p>
          </div>
        )}
        {sideHeadingOne && (
          <div className="fade-slide-in-right">
            <p>
              Step 1:
              <br /> There were 5 cars.
              <br /> We crossed and
              <br /> removed 3 of them
              <br /> to subtract 3 from 5.
            </p>
            <p>
              Step 2:
              <br /> Count the number of
              <br /> remaining cars.
              <br /> Fill that number in
              <br />
              the box and check.
            </p>
          </div>
        )}
        {sideHeadingTwo && (
          <div className="fade-slide-in-right">
            <p>
              Subtracting
              <br /> 3 from 5<br /> gives 2.
              <br />{" "}
            </p>
            <p>Also,</p>
            <p>
              If 3 is subtracted
              <br /> from 5, then 2<br /> remains.
            </p>
          </div>
        )}
      </div>
      <div className="main-right">
        <div className="main-right-item">
          <div className="main-right-item-one">
            {showBoxHeading && (
              <div className="adjust-top">
                <div className="main-heading-align fade-slide-in-right">
                  <h2
                    style={{
                      color: "white",
                      fontSize: "2vw",
                    }}
                  >
                    Subtracting 3 from 5 gives
                  </h2>
                  <div
                    className="main-car-box fade-slide-in-right"
                    style={boxBoundary}
                  >
                    {number}
                  </div>
                </div>
              </div>
            )}
            <div className="fade-slide-in-right">
              <CarTwo
                counter={counter}
                setCounter={setCounter}
                setShowError={() => setShowError(false)}
                carButtonsDisabled={carButtonsDisabled}
              />
            </div>
          </div>
          <div className="main-right-item-two">
            {showError && <div className="fade-slide-in-right"><ErrorMessage count={counter} /></div>}

            {showCheckButton && (
              <button className="check-button fade-slide-in-right" onClick={handleCheckOne}>
                Check
              </button>
            )}
            {showKeypad && (
               <div className="fade-slide-in-right"> 
              <Keypad
                hintMessage={hintMessage}
                setHintMessage={() => setHintMessage(true)}
                setNumber={handleNumber}
                handleCheckTwo={handleCheckTwo}
              />
              </div>
            )}
            {showErrorOne && <ErrorMessageKeypad count={number} />}
          </div>
        </div>
        <div className="main-right-footer">
          {counter === 0 && <h2 className="fade-slide-in-right">Tap cars to remove, then tap CHECK.</h2>}
          {counter > 0 && showCheckButton && (
            <h2 className="fade-slide-in-right">Tap on the cars to cross them and CHECK.</h2>
          )}
          {sideHeadingOne && (
            <h2 className="fade-slide-in-right">Tap the correct number and then tap check.</h2>
          )}
          {sideHeadingTwo && <h2 className="fade-slide-in-right"> Tap ▶ for the next challenge…</h2>}
        </div>
        <div className="main-right-footer-two">
          {showNextButton && (
            <button
              className="next-button fade-slide-in-right"
              onClick={() => window.location.reload()}
            >
              ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
