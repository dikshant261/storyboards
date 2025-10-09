import React from "react";
import "./fraction.css";
const Fraction = ({ num, deno, fontSize, style }) => {
  return (
    <div className="fraction-conatiner">
      <div className="fraction" style={style}>
        <span>{num}</span>
        <span className="fraction-line"></span>
        <span>{deno}</span>
      </div>
    </div>
  );
};

export default Fraction;
