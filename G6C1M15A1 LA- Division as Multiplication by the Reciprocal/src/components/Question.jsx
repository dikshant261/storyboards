import React from "react";
import "./question.css";
const Question = ({ divisor, dividend, style }) => {
  return (
    <div className="question-container" style={style}>
      <div>{divisor}</div>
      <div>÷</div>
      <div>{dividend}</div>
    </div>
  );
};

export default Question;
