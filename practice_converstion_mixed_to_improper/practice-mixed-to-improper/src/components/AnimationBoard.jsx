import React, { useEffect, useState } from "react";
import "./animation.css";
const FractionAnimation = ({
  showAniButton,
  remainder,
  numerator,
  denominator,
}) => {
  const [showStep0, setShowStep0] = React.useState(false);
  const [showStep1, setShowStep1] = React.useState(false);
  const [showStep2, setShowStep2] = React.useState(false);
  const [showStep3, setShowStep3] = React.useState(false);
  const [showFormulaOne, setShowFormulaOne] = React.useState(true);
  const [showFormulaTwo, setShowFormulaTwo] = React.useState(false);
  const [showStep4, setShowStep4] = React.useState(false);
  const [showStep5, setShowStep5] = React.useState(false);
  const [showStep6, setShowStep6] = React.useState(false);
  const [showArrow, setShowArrow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStep0(true);
    }, 2000);
    const timer2 = setTimeout(() => {
      setShowStep1(true);
    }, 4000);
    const timer6 = setTimeout(() => {
      setShowStep6(true);
    }, 6000);
    const timer7 = setTimeout(() => {
      setShowStep2(true);
    }, 8000);
    const timer3 = setTimeout(() => {
      setShowArrow(true);
      setShowStep3(true);
    }, 10000);
    const timer4 = setTimeout(() => {
      setShowArrow(false)
      setShowFormulaOne(false);
      setShowFormulaTwo(true);
      setShowStep4(true);
    }, 12000);
    const timer5 = setTimeout(() => {
      setShowFormulaTwo(false);
      setShowStep5(true);
      showAniButton();
    }, 14000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div className="fraction-container">
      {/* Mixed Fraction */}
      <div className="mixed-fraction instruction-align fade-in">
        {showStep6 && (
          <div className="fade-in">
            <div
              class="x-icon"
              style={{
                color: "#ffab40",
              }}
            >
              +
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="3.9 2.9 1.2 1.2"
              style={{
                position: "absolute",
                width: "5vw",
                top: "3vh",
                left: "1vw",
              }}
            >
              <path
                d="M 5 3 A 1 1 0 0 0 4 4"
                stroke="#ffab40"
                stroke-width="0.04"
                fill="none"
              />
            </svg>
          </div>
        )}
        {showStep0 && (
          <div className="fade-in">
            <div
              class="plus-icon"
              style={{
                color: "#ffab40",
                
                fontSize: "2vw",
              }}
            >
              X
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="3.9 2.9 1.2 1.2"
              style={{
                position: "absolute",
                width: "5vw",
                bottom: "10%",
                left: "1vw",
                transform: "rotate(-90deg)",
              }}
            >
              <path
                d="M 5 3 A 1 1 0 0 0 4 4"
                stroke="#ffab40"
                stroke-width="0.04"
                fill="none"
              />
            </svg>
          </div>
        )}
        <span className="whole-number">{remainder}</span>
        <span className="fraction">
          <span className="numerator">{numerator}</span>
          <span className="denominator">{denominator}</span>
        </span>
      </div>

      {/* Equals Sign */}
      <span className="equals">=</span>

      {/* Improper Fraction Formula */}

      <div className="improper-fraction">
        <span className="formula">
          {showStep1 && showFormulaOne && (
            <span className="part fade-in">
              <span className="multiplier">{remainder}</span> ×{" "}
              <span className="denom">{denominator}</span>{" "}
              {showStep2 && <span className="fade-in">+ {numerator}</span>}
            </span>
          )}
          {showStep4 && showFormulaTwo && (
            <span className="part fade-in">
              <span>{remainder * denominator}</span>
              <span className="denom">+ {numerator}</span>
            </span>
          )}
          {showStep5 && (
            <span className="part fade-in">
              <span>{remainder * denominator + numerator}</span>
            </span>
          )}
          {showStep3 && <span className="divider"></span>}
          {showStep3 && (
            <div className="fade-in" style={{
              position:"relative"
            }}>
              {showArrow && <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="9.9 7.9 8.2 0.2"
                  style={{
                    position:'absolute',
                    top:'6vh',
                    right:'7vw',
                    height:"5vh",
                    width:"20vw"
                  }}
                >
                  <path
                    d="M 10 8 H 18"
                    stroke="var(--secondary-color)"
                    stroke-width="0.1"
                    fill="none"
                  />
                </svg>
              </div>}
              <span className="denominator">{denominator}</span>
            </div>
          )}
        </span>
      </div>

      {/* Optional arrow/animation */}
      {/* <div className="v-line"></div>
      <div className="h-line"></div>
      <div class="x-icon">X</div>
      <div className="v-line-1"></div>
      <div className="h-line-1"></div>
      <div className="plus-icon">+</div> */}
    </div>
  );
};

export default FractionAnimation;
