import React, { useEffect, useState } from "react";
import "./Denominator.css";
const Denominator = ({
  start,
  setLine,
  DenominatorResult,
  setBoxNumber,
  denominatorFind,
  borderLine,
  triggerAnimate,
  triggerLineAnimate,
  triggerColumnAnimate,
  nextButton,
  numeratorButtons,
  finalResult,
}) => {
  const [numeratorView, setNumeratorView] = useState(true);
  const [denominator, setDenominator] = useState(0);
  const [numeratorIncrement, setNumeratorIncrement] = useState(0);
  const [viewNumerator, setViewNumerator] = useState(false);
  const [denominatorError, setDenominatorError] = useState(false);
  const [denominatorErrorMessage, setDenominatorErrorMessage] = useState("");
  const [denominatorSuccess, setDenominatorSuccess] = useState(false);
  const [numeratorError, setNumeratorError] = useState(false);
  const [numeratorSuccess, setNumeratorSuccess] = useState(false);
  const [numeratorMessage, setNumeratorMessage] = useState("");
  const [actualResult, setActualResult] = useState(true);
  const [numeratorBtnAnimate, setNumeratorBtnAnimate] = useState(false);
  const denominatorHandleIncrease = () => {
    DenominatorResult(0);
    setDenominator(denominator + 1);
    setLine(denominator + 1);
    setDenominatorError(false);
    setDenominatorSuccess(false);
    if (triggerLineAnimate) triggerLineAnimate();
    if (triggerAnimate) triggerAnimate();
  };
  const denominatorHandleDecrease = () => {
    DenominatorResult(0);
    if (denominator === 0) {
      setDenominator(0);
      setLine(0);
      setDenominatorError(false);
      setDenominatorSuccess(false);
    } else {
      setDenominator(denominator - 1);
      setLine(denominator - 1);
      setDenominatorError(false);
      setDenominatorSuccess(false);
    }
    if (triggerLineAnimate) triggerLineAnimate();
    if (triggerAnimate) triggerAnimate();
  };
  const handleDenominatorCheck = () => {
    DenominatorResult(denominator);
    if (denominator === 0) {
      return;
    }
    if (denominator === 5) {
      nextButton();
      setViewNumerator(true);
      setNumeratorView(false);
      denominatorFind(true);
      setDenominatorSuccess(true);
      setDenominatorErrorMessage(
        "That’s correct! Each<br /> whole is divided into 5<br /> parts."
      );
    } else {
      setDenominatorError(true);
      setDenominatorErrorMessage(
        "Oops! You missed a few<br /> equal parts in each<br /> whole."
      );
    }
    if (triggerColumnAnimate) triggerColumnAnimate();
    if (triggerAnimate) triggerAnimate();
  };
  const numeratorHandleIncrease = () => {
    setNumeratorSuccess(false);
    setNumeratorError(false);
    borderLine("");
    DenominatorResult(0);
    setLine(0);
    setDenominatorSuccess(false);
    setNumeratorIncrement(numeratorIncrement + 1);
    setBoxNumber(numeratorIncrement + 1);
    setNumeratorBtnAnimate(true);
    setTimeout(() => setNumeratorBtnAnimate(false), 400);
  };
  const numeratorHandleDecrease = () => {
    setNumeratorSuccess(false);
    setNumeratorError(false);
    borderLine("");
    if (numeratorIncrement === 0) {
      setNumeratorIncrement(0);
      setBoxNumber(0);
    } else {
      setNumeratorIncrement(numeratorIncrement - 1);
      setBoxNumber(numeratorIncrement - 1);
    }
    setNumeratorBtnAnimate(true);
    setTimeout(() => setNumeratorBtnAnimate(false), 400);
  };
  const handleNumeratorCheck = () => {
    if (numeratorIncrement === 12) {
      setActualResult(false);
      finalResult(true);
      setNumeratorSuccess(true);
      borderLine(" ");
      setNumeratorMessage(
        `That’s correct! ${numeratorIncrement}<br /> shaded parts is a<br /> numerator of 5.`
      );
    } else if (numeratorIncrement < 12) {
      setNumeratorError(true);
      borderLine("red");
      setNumeratorMessage(
        `Oops, ${numeratorIncrement} is less than<br /> the shaded parts in the<br /> image.`
      );
    } else if (numeratorIncrement > 12) {
      setNumeratorError(true);
      borderLine("red");
      setNumeratorMessage(
        `Oops, ${numeratorIncrement} is greater<br /> than the shaded parts<br /> in the image.`
      );
    }
  };
  useEffect(() => {
    if (numeratorButtons) {
      setDenominatorSuccess(false);
      DenominatorResult(0);
      setLine(0);
    }
  }, [numeratorButtons]);
  return (
    <div>
      <div className="denominator-container">
        {/*numerator */}
       
        {actualResult && (

          <div>
            <h2 className="heading-denominator">Improper Fraction</h2>
            <div className="denominator-container-items">
              {numeratorButtons && (
                <div
                  className={`denominator-container-buttons${
                    numeratorBtnAnimate ? " numerator-btn-animate" : ""
                  }`}
                  onClick={numeratorHandleDecrease}
                >
                  -
                </div>
              )}
              <div
                className="denominator-box"
                style={{
                  backgroundColor: numeratorSuccess
                    ? "rgba(146,208,80)"
                    : numeratorError
                    ? "rgba(255, 126, 121)"
                    : "#fff",
                }}
              >
                {numeratorIncrement}
              </div>
              {numeratorButtons && (
                <div
                  className={`denominator-container-buttons${
                    numeratorBtnAnimate ? " numerator-btn-animate" : ""
                  }`}
                  onClick={numeratorHandleIncrease}
                >
                  +
                </div>
              )}
            </div>
            <div className="line"></div>
            {/* Denominator  */}
            <div className="denominator-container-items">
              {!start && numeratorView && (
                <div
                  className="denominator-container-buttons"
                  onClick={denominatorHandleDecrease}
                >
                  -
                </div>
              )}
              <div
                className="denominator-box"
                style={{
                  backgroundColor: denominatorSuccess
                    ? "rgba(146,208,80)"
                    : denominatorError
                    ? "rgba(255, 126, 121)"
                    : "#fff",
                }}
              >
                {denominator}
              </div>
              {!start && numeratorView && (
                <div
                  className="denominator-container-buttons"
                  onClick={denominatorHandleIncrease}
                >
                  +
                </div>
              )}
            </div>
            <div>
              {!start && (
                <div>
                  {" "}
                  {viewNumerator ? (
                    <div style={{ textAlign: "center" }}>
                      <button
                        className="check-button"
                        onClick={handleNumeratorCheck}
                      >
                        Check
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <button
                        className="check-button"
                        onClick={handleDenominatorCheck}
                      >
                        Check
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {!actualResult && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontSize: "3vw",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <p>12</p>
            <div className="line" style={{ marginTop: "0" }}></div>
            <p>5</p>
          </div>
        )}

        {denominatorError &&
          (typeof denominatorErrorMessage === "string" &&
          denominatorErrorMessage.includes("<br") ? (
            <p
              className="error-message"
              dangerouslySetInnerHTML={{ __html: denominatorErrorMessage }}
            />
          ) : (
            <p className="error-message">{denominatorErrorMessage}</p>
          ))}
        {denominatorSuccess &&
          (typeof denominatorErrorMessage === "string" &&
          denominatorErrorMessage.includes("<br") ? (
            <p
              className="error-message"
              style={{ backgroundColor: "rgba(146,208,80, 0.5)" }}
              dangerouslySetInnerHTML={{ __html: denominatorErrorMessage }}
            />
          ) : (
            <p className="error-message">{denominatorErrorMessage}</p>
          ))}
        {numeratorSuccess &&
          (typeof numeratorMessage === "string" &&
          numeratorMessage.includes("<br") ? (
            <p
              className="error-message"
              style={{ backgroundColor: "rgba(146,208,80, 0.5)" }}
              dangerouslySetInnerHTML={{ __html: numeratorMessage }}
            />
          ) : (
            <p className="error-message">{numeratorMessage}</p>
          ))}
        {numeratorError &&
          (typeof numeratorMessage === "string" &&
          numeratorMessage.includes("<br") ? (
            <p
              className="error-message"
              dangerouslySetInnerHTML={{ __html: numeratorMessage }}
            />
          ) : (
            <p className="error-message">{numeratorMessage}</p>
          ))}
      </div>
      
    </div>
  );
};

export default Denominator;
