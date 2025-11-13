import React from "react";
import "./Fraction.css";

const Fraction = ({
  numerator,
  denominator,
  fontSize = "2vw",
  color = "white",
  lineWidth = "100%",
  lineHeight = "0.4vh",
  style,
  value,
}) => {
  console.log("value : ",value)
  return (
    <div className="question-fraction" style={{ fontSize, color, ...style }}>
      <span className="numerator" style={{ color: value === 1 ? "gray" : "" }}>
        {numerator}
      </span>
      <span
        className="line"
        style={{
          width: lineWidth,
          height: lineHeight,
          backgroundColor: color,
        }}
      ></span>
      <span
        className="denominator"
        style={{ color: value === 2 ? "gray" : "" }}
      >
        {denominator}
      </span>
    </div>
  );
};

export default Fraction;
