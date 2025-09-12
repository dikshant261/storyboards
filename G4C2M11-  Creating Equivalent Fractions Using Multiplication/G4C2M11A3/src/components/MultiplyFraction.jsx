import React from "react";
import "./fraction.css";
const MultiplyFraction = ({ num, deno, beat, result, green, sign = "" }) => {
  return (
    <div className="fraction-conatiner">
      <div className="multiply-fraction">
        <span className="box-align">
          <span>{num}</span> {<span>{sign === "÷" ? "÷" : "x"}</span>}
          <span className={`box ${beat ? "active" : ""} ${green}`}>
            {result}
          </span>
        </span>
        <span className="fraction-line"></span>
        <span className="box-align">
          <span>{deno}</span> {<span>{sign === "÷" ? "÷" : "x"}</span>}
          <span className={`box ${beat ? "active" : ""} ${green}`}>
            {result}
          </span>
        </span>
      </div>
    </div>
  );
};

export default MultiplyFraction;
