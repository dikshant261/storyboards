import React, { useState } from "react";
import "./mixnumber.css"; // Assuming you have a CSS file for styling
import Grid from "../components/GridBoxes";
import Denominator from "../components/Denominator";
import BoxLayout from "../components/BoxLayout";
const MixNumber = () => {
  const [start, setStart] = useState(true);
  const [showPlusMinusHeading, setShowPlusMinusHeading] = useState(false);
  const [denominatorHeading1, setDenominatorHeading1] = useState(false);
  const [line, setLine] = useState(0);
  const [denominatorResult, setDenominatorResult] = useState(0);
  const [boxNumber, setBoxNumber] = useState(0);
  const [denominatorFind, setDenominatorFind] = useState(false);
  const [borderLine, setBorderLine] = useState("");
  const [animate, setAnimate] = useState(false); // Animation state
  const [childAnimate, setChildAnimate] = useState(false); // Animate children
  const [lineAnimate, setLineAnimate] = useState(false);
  const [columnAnimate, setColumnAnimate] = useState(false);
  const [denominatorHeading2, setDenominatorHeading2] = useState(false);
  const [numeratorHeading1, setNumeratorHeading1] = useState(false);
  const [nextButton1, setNextButton1] = useState(false);
  const [numeratorButtons, setNumeratorButtons] = useState(false);
  const [finalResult, setFinalResult] = useState(false);
  const [numberChangeAnimate, setNumberChangeAnimate] = useState(false);

  const lineHandle = (num) => {
    setLine(num);
  };
  const handleDenominatorResult = (result) => {
    setDenominatorResult(result);
  };
  const handleBoxNumber = (number) => {
    setBoxNumber(number);
    setNumberChangeAnimate(true);
    setTimeout(() => setNumberChangeAnimate(false), 500);
  };
  const handleDenominatorFind = (found) => {
    setDenominatorFind(found);
  };
  const handleBorderLine = (color) => {
    setBorderLine(color);
  };
  const handleStart = () => {
    setAnimate(true);
    setTimeout(() => {
      setStart(false);
    }, 500); // Animation duration
  };
  const nextButton = () => {
    setDenominatorHeading1(false);
    setDenominatorHeading2(true);
    setNextButton1(true);
    setShowPlusMinusHeading(false);
  };
  const handleNext1 = () => {
    setDenominatorHeading2(false);
    setNumeratorHeading1(true);
    setNumeratorButtons(true);
    setNextButton1(false);
  };
  const handleFinalResult = (result) => {
    setNumeratorHeading1(false);
    setFinalResult(result);
  };
  return (
    <div className={`mix-number-container${animate ? " fade-in" : ""}`}>
      <div className="mix-number-container-items">
        <div className="mix-number-container-items-heading">
          {start && (
            <h2 className="">
              See the picture on the left which contains a fraction.
              <br /> Let’s represent it using numbers in different ways…
            </h2>
          )}
          {denominatorHeading1 && (
            <h2>
              Notice how the mixed number changes as you change the denominator.
            </h2>
          )}
          {denominatorHeading2 && (
            <h2>
              Notice the mixed number, it also has the denominator set to 5.
            </h2>
          )}
          {numeratorHeading1 && (
            <h2>
              Notice how the mixed number changes as you change the numerator
            </h2>
          )}
          {finalResult && <h2>12/5 is 2 whole(s) and ⅖.</h2>}
        </div>
        <div className="mix-number-container-items-main">
          <div
            className={`mix-number-item${animate ? " fade-in-child" : ""}`}
          >
            <Grid
              line={line}
              denominatorResult={denominatorResult}
              boxNumber={boxNumber}
              borderLine={borderLine}
              lineAnimate={lineAnimate}
              columnAnimate={columnAnimate}
              finalResult={finalResult}
              numberChangeAnimate={numberChangeAnimate}
            />
          </div>
          <div
            className={`mix-number-item${animate ? " fade-in-child" : ""}`}
          >
            <Denominator
              start={start}
              setLine={lineHandle}
              DenominatorResult={handleDenominatorResult}
              setBoxNumber={handleBoxNumber}
              denominatorFind={handleDenominatorFind}
              borderLine={handleBorderLine}
              nextButton={nextButton}
              numeratorButtons={numeratorButtons}
              finalResult={handleFinalResult}
              triggerLineAnimate={() => {
                setLineAnimate(true);
                setTimeout(() => setLineAnimate(false), 700);
              }}
              triggerColumnAnimate={() => {
                setColumnAnimate(true);
                setTimeout(() => setColumnAnimate(false), 700);
              }}
            />
          </div>
          <div
            className={`mix-number-item${animate ? " fade-in-child" : ""}${
              childAnimate ? " animate-child" : ""
            }`}
          >
            <BoxLayout
              line={line}
              boxNumber={boxNumber}
              denominatorFind={denominatorFind}
              animate={childAnimate}
              finalResult={finalResult}
              numberChangeAnimate={numberChangeAnimate}
            />
          </div>
        </div>
      </div>
      <div className="mix-number-footer-1">
        {start && <h2>Tap Start to begin</h2>}
        {showPlusMinusHeading && (
          <h2>
            Use the ‘+’ and ‘–’ buttons to set the denominator, then tap Check.
          </h2>
        )}
        {numeratorHeading1 && (
          <h2>
            {" "}
            Use the ‘+’ and ‘–’ buttons to set the numerator, then tap Check.
          </h2>
        )}
        {nextButton1 && <h2>Tap Next.</h2>}
      </div>
      <div className="mix-number-footer-2">
        {start && (
          <button
            className="next-button"
            onClick={() => {
              handleStart();
              setDenominatorHeading1(true);
              setShowPlusMinusHeading(true);
            }}
          >
            Start
          </button>
        )}
        {nextButton1 && (
          <button
            className="next-button"
            onClick={() => {
              handleNext1();
            }}
          >
            Next
          </button>
        )}
        
      </div>
    </div>
  );
};

export default MixNumber;
