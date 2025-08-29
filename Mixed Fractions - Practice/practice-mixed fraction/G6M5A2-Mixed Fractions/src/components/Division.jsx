import React from "react";
import "./Division.css";

const LongDivision = ({
  quotient,
  questionData,
  remainder,
  handleQuotient,
  handleRemainder
}) => {
  const [answerRight, setAnswerRight] = React.useState(false);
  const [showCross, setShowCross] = React.useState(false);
  const [showRed, setShowRed] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [difference, setDifference] = React.useState(null);
  const [remainderSuccess, setRemainderSuccess] = React.useState(false);
  React.useEffect(() => {
    if (
      quotient !== questionData.rightQuotient &&
      questionData.divisor * quotient <= questionData.dividend
    ) {
      setDifference(questionData.dividend - questionData.divisor * quotient);
      setShowRed(true);
    } else {
      setDifference(null);
    }
  }, [quotient, questionData]);
  React.useEffect(() => {
    if (
      quotient !== questionData.rightQuotient &&
      questionData.divisor * quotient > questionData.dividend
    ) {
      setShowCross(true);
      setShowRed(true);
    } else {
      setShowCross(false);
    }
  }, [quotient, questionData]);

  React.useEffect(() => {
    if (quotient === questionData.rightQuotient) {
      setSuccess(true);
      handleQuotient();
      setShowRed(false);
    } else {
      setSuccess(false);
    }
  }, [quotient, questionData]);
  React.useEffect(() => {
    if (remainder === questionData.rightRemainder) {
      setRemainderSuccess(true);
      handleRemainder();
    } else {
      setRemainderSuccess(false);
    }
  }, [remainder]);
  let num;
  if (quotient === questionData.rightQuotient) {
    num = questionData.divisor * quotient;
  } else {
    num = questionData.divisor * quotient;
  }
  // console.log(quotient, questionData);
  return (
    <div className="division-container">
      {/* Top Answer */}
      {!success && (
        <div
          className="answer-box"
          style={{
            backgroundColor: showRed ? "lightcoral" : "lightgray",
            color: "black",
          }}
        >
          {quotient}
        </div>
      )}
      {success && <div className="answer-box-success">{quotient}</div>}
      {/* Division Structure */}
      <div className="division-symbol">
        <span className="divisor">{questionData.divisor}</span>

        {/* Bracket + Dividend */}
        <div className="division-bracket">
          <svg
            className="division-svg"
            width="4.5vw"
            height="4.5vw"
            viewBox="0 0 60 50"
          >
            <path
              d="M15 0 Q5 25 15 50 L60 50"
              stroke="white"
              strokeWidth="3"
              fill="none"
            />
          </svg>
          <span className="dividend">{questionData.dividend}</span>
        </div>
      </div>

      {/* Subtraction step */}
      {quotient !== null && (
        <div>
          <div className="subtraction">
            <span
              className="minus"
              style={{
                color: success ? "var(--success-second-color)" : "lightcoral",
              }}
            >
              -
            </span>
            <span
              className="subtracted"
              style={{
                color: success ? "var(--success-second-color)" : "lightcoral",
              }}
            >
              {num}
            </span>
          </div>
          <div className="underline"></div>
          {/* Show difference if wrong quotient and num <= dividend */}
          {difference !== null && (
            <div className="difference-row">
              <span className="difference-value">{difference}</span>
            </div>
          )}
        </div>
      )}

      {/* Wrong mark */}
      {showCross && <div className="wrong-mark">X</div>}
      {remainder !== null && (
        <div
          className="subtracted-1"
          style={{
            color: remainderSuccess
              ? "var(--success-second-color)"
              : "lightcoral",
            fontSize: "2.8vw",
          }}
        >
          {remainder}
        </div>
      )}
    </div>
  );
};

export default LongDivision;
