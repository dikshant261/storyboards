import React, { useEffect, useState } from "react";
import "./animatedresult.css";
import Fraction from "./Fraction";

const AnimatedResult = ({ step, stepIndex, isLastStep }) => {
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Animate steps
  useEffect(() => {
    const timers = [
      setTimeout(() => setStepOne(true), 1000),
      setTimeout(() => setStepTwo(true), 2000),
      setTimeout(() => setStepThree(true), 3000),
      setTimeout(() => setShowResult(true), 3500), // Fly animation starts after step 3
    ];
    return () => timers.forEach(clearTimeout);
  }, [stepIndex]);

  return (
    <div className="result-container">
      <div className="result">
        {/* Original fraction */}
        <div>
          <Fraction
            numerator={step.originalNum}
            denominator={step.originalDen}
            fontSize="4vw"
            lineHeight="0.7vh"
            lineWidth="5vw"
          />
        </div>

        <p>=</p>

        {/* Division step */}
        <div className="divide-fraction">
          <p style={{ opacity: stepOne ? "1" : "0" }}>
            {step.originalNum} ÷ {step.divisor}
          </p>
          <div className="line" style={{ opacity: stepTwo ? "1" : "0" }}></div>
          <p style={{ opacity: stepTwo ? "1" : "0" }}>
            {step.originalDen} ÷ {step.divisor}
          </p>
        </div>

        <p style={{ opacity: stepThree ? "1" : "0" }}>=</p>

        {/* Final simplified fraction with fly animation */}
        <div 
          className={`result-fraction`}
          style={{ opacity: stepThree ? "1" : "0" }}
        >
          <Fraction
            numerator={step.newNum}
            denominator={step.newDen}
            fontSize="4vw"
            lineHeight="0.7vh"
            lineWidth="5vw"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedResult;