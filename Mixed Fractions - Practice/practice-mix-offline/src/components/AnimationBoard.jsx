import React, { useEffect } from "react";
import "./animation.css";

const FractionAnimation = ({
  showAniButton,
  remainder,
  numerator,
  denominator,
}) => {
  const [showStep1, setShowStep1] = React.useState(false);
  const [showStep2, setShowStep2] = React.useState(false);
  const [showStep3, setShowStep3] = React.useState(false);
  const [showFormulaOne, setShowFormulaOne] = React.useState(true);
  const [showFormulaTwo, setShowFormulaTwo] = React.useState(false);
  const [showStep4, setShowStep4] = React.useState(false);
  const [showStep5, setShowStep5] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStep1(true);
    }, 2000);
    const timer2 = setTimeout(() => {
      setShowStep2(true);
    }, 4000);
    const timer3 = setTimeout(() => {
      setShowStep3(true);
    }, 6000);
    const timer4 = setTimeout(() => {
      setShowFormulaOne(false);
      setShowFormulaTwo(true);
      setShowStep4(true);
    }, 8000);
    const timer5 = setTimeout(() => {
      setShowFormulaTwo(false);
      setShowStep5(true);
      showAniButton();
    }, 10000);

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
      <div className="mixed-fraction fade-in">
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
          {showStep3 && <span className="divider denominator fade-in"> 
            <span className="denominator">
            {denominator}</span>
        </span>}
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
