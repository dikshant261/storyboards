import React from "react";
import "./fraction.css";

const FractionMultiply = ({
  numerator,
  denominator,
  count,
  pluse = false,
  fontSize,
  add,
}) => {
  if (pluse) {
    return (
      <div className="multiply">
        <span className="top">
          {numerator} + {count}
        </span>
        <span className="line"></span>
        <span className="bottom">{denominator}</span>
      </div>
    );
  }
  if (add === "") {
    return (
      <div className="multiply" style={{ fontSize: fontSize }}>
        <span className="top">
          {numerator} + {count}
        </span>
        <span className="line"></span>
        <span className="bottom">{denominator}</span>
      </div>
    );
  }
  return (
    <div className="multiply" style={{ fontSize: fontSize }}>
      <span className="top">
        {numerator} x {count}
      </span>
      <span className="line"></span>
      <span className="bottom">{denominator}</span>
    </div>
  );
};

export default FractionMultiply;
