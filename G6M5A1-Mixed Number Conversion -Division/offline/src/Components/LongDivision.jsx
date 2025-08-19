import React, { useEffect } from "react";
import DivisionBracket from "./DivisionBracket.svg.jsx";
import "./LongDivision.css";

/**
 * Long-division layout using the SVG bracket.
 * Pass any numbers you like; strings also work.
 */
const LongDivision = ({ currentQuotient, questionData }) => {
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [mark, setMark] = React.useState(false);
  const [showSubtract, setShowSubtract] = React.useState(false);
  const [subtract, setSubtract] = React.useState(null);
  let multiply = currentQuotient * questionData.divisor;
  const [hasAttempted, setHasAttempted] = React.useState(false);
  useEffect(() => {
    if (currentQuotient !== null && currentQuotient !== undefined) {
      setHasAttempted(true);
    }
    if (currentQuotient === questionData.correctAnswer) {
      setSubtract(questionData.dividend - multiply);
      setIsCorrect(true);
      setMark(false);
      setShowSubtract(true);
    } else if (multiply > questionData.dividend) {
      setMark(true);
      setShowSubtract(false);
      setSubtract(null);
    } else if (multiply < questionData.dividend) {
      setShowSubtract(true);
      setMark(false);
      setSubtract(questionData.dividend - multiply);
    }
  }, [currentQuotient, questionData]);
  return (
    <div className="ld-wrap">
      {/* SVG bracket */}
      <DivisionBracket className="ld-bracket" />

      {/* Numbers positioned relative to the bracket */}
      <div className="ld-number ld-divisor">{questionData.divisor}</div>
      <div className="ld-number ld-dividend">{questionData.dividend}</div>
      <div className={`ld-number ld-quotient ${isCorrect ? 'ld-correct' : 'ld-incorrect'}`}>{currentQuotient}</div>

      {currentQuotient !== null && (
        <div className={`ld-number ld-subtract ${isCorrect ? 'ld-correct' : 'ld-incorrect'}`}>
          <span className="ld-minus">-</span>
          <span className="ld-subtract-num">{multiply}</span>
          <span className={`ld-underline ${isCorrect ? 'ld-underline-correct' : 'ld-underline-incorrect'}`} />
        </div>
      )}

      {mark && <div className={`ld-number ld-mark ld-incorrect`}>X</div>}
  {hasAttempted && subtract!==null && <div className={`ld-number ld-mark ${isCorrect ? 'ld-correct' : 'ld-incorrect'}`}>{subtract}</div>}
    </div>
  );
};

export default LongDivision;
