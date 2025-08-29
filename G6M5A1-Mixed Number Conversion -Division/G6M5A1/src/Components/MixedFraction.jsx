import React from "react";
import "./MixedFraction.css";

const MixedFraction = ({ numerator, denominator, showSimplyAnswer }) => {
  const quotient = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;

  return (
    <div className={`mf-container ${showSimplyAnswer ? "mf-merge-ready" : ""}`}>
      {/* Improper fraction */}
      <div className="mf-fraction">
        <div className="mf-num">{numerator}</div>
        <div className="mf-line"></div>
        <div className="mf-den">{denominator}</div>
      </div>

      <div className="mf-equal">=</div>

      {/* Mixed number */}
      <div className="mf-mixed">
        <div className="mf-quotient mf-merge-target-quotient">{quotient}</div>
        <div className="mf-fraction">
          <div className="mf-num remainder mf-merge-target-remainder" style={{
            borderBottom:'none'
          }}>{remainder}</div>
          <div className="mf-line"></div>
          <div className="mf-den remainder mf-merge-target-divisor"
          style={{
            borderBottom:'none'
          }}>{denominator}</div>
        </div>
      </div>
    </div>
  );
};

export default MixedFraction;
