import React from "react";
import "./Fraction.css";

const Fraction = ({
  numerator,
  denominator,
  fontSize = "2vw",
  color = "white",
  lineWidth = "100%",
  lineHeight = "0.4vh",
}) => {
  return (
    <div className="question-fraction" style={{ fontSize, color }}>
      <span className="numerator">{numerator}</span>
      <span
        className="line"
        style={{
          width: lineWidth,
          height: lineHeight,
          backgroundColor: color,
        }}
      ></span>
      <span className="denominator">{denominator}</span>
    </div>
  );
};

export default Fraction;
