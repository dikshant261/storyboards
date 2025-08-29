
import React from "react";
import './Option.css';

const Option = ({ numerator, denominator, onClick, disabled, isCorrect, isWrong, isDashed }) => {
  let className = "option-item";
  if (isCorrect) className += " option-correct";
  if (isWrong) className += " option-wrong";
  if (isDashed) className += " option-dashed";
  return (
    <div className="option-container">
      <button
        className={className}
        onClick={onClick}
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        <div>{numerator}</div>
        <div className="option-line"></div>
        <div>{denominator}</div>
      </button>
    </div>
  );
};

export default Option;
  