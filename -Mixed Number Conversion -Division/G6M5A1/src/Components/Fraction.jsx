import React from "react";
import "./Fraction.css";
import FractionGroups from "./FractionGroups";
const Fraction = ({
  numerator,
  denominator,
  questionData,
  currentQuotient,
  showLongDivision,
}) => {
  const showSingleFraction = questionData === null || currentQuotient === null || currentQuotient === undefined;
  return (
    <div className="fraction-container">
      {showSingleFraction ? (
        <div className="right-fraction">
          <div>{numerator}</div>
          <div className="fraction-line">
            {showLongDivision && <div className="fraction-line-copy"></div>}
          </div>
          <div>{denominator}</div>
        </div>
      ) : (
        <FractionGroups
          numerator={numerator}
          denominator={denominator}
          chosenQuotient={currentQuotient}
          correctAnswer={questionData.correctAnswer}
        />
      )}
    </div>
  );
};

export default Fraction;
