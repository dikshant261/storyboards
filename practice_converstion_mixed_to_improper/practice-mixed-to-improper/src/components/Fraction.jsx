import React from "react";
import "./Fraction.css";
const Fraction = ({remainder,numerator,denominator}) => {
  return (
    <div className="fraction-container">
      <div>{remainder}</div>
      <div className="right-fraction">
        <div>{numerator}</div>
        <div className="fraction-line"></div>
        <div>{denominator}</div>
      </div>
    </div>
  );
};

export default Fraction;
