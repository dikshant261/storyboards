import React, { useEffect, useState } from "react";
import "./mixfraction.css";
import Quotient from "./Quotient";
const MixedFraction = ({ quotient, remainder, denominator, questionData }) => {
  const [successQuotient, setSuccessQuotient] = React.useState(false);
  const [showQuetientData, setShowQuetientData] = React.useState(true);
  const [remainderSuccess, setRemainderSuccess] = React.useState(false);
  const [showBoxRem, setShowBoxRem] = React.useState(false);
  const [showEQ, setShowEQ] = useState(false);
  const [showEQVisible, setShowEQVisible] = useState(false);

  useEffect(() => {
    if (quotient === questionData.rightQuotient) {
      setSuccessQuotient(true);
      setShowQuetientData(false);
      setShowBoxRem(true);
    } else {
      setSuccessQuotient(false);
    }
  }, [quotient, questionData]);
  useEffect(() => {
    if (remainder !== null) {
      setShowBoxRem(false);
    }
  }, [remainder, questionData]);
  useEffect(() => {
    if (remainder === questionData.rightRemainder) {
      setRemainderSuccess(true);
    } else {
      setRemainderSuccess(false);
    }
  }, [remainder, questionData]);
  let multiply = questionData.divisor * quotient;
  useEffect(() => {
    if (
      quotient !== questionData.rightQuotient &&
      multiply < questionData.dividend &&
      quotient !== null
    ) {
      setShowEQ(true);
      const timer = setTimeout(() => {
        setShowEQ(false);
        setShowEQVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowEQ(false);
      setShowEQVisible(false);
    }
  }, [quotient, questionData.rightQuotient, multiply, questionData.dividend]);
  // Style logic for quotient
  let quotientStyle = {};
  if (quotient == null) {
    quotientStyle = {
      color: "lightgray",
      border: "0.3vw dashed lightgray",
      background: "transparent",
    };
  } else if (successQuotient) {
    quotientStyle = {
      color: "var(--success-second-color)",
      border: "none",
      background: "transparent",
    };
  } else {
    quotientStyle = {
      color: "lightcoral",
      border: "0.3vw dashed lightcoral",
      background: "transparent",
    };
  }

  // Style logic for remainder
  let remainderStyle = {};
  if (remainder == null) {
    remainderStyle = {
      color: "lightgray",
      border: "0.3vw dashed lightgray",
      background: "transparent",
    };
  } else if (remainderSuccess) {
    remainderStyle = {
      color: "var(--secondary-color)",
      border: "none",
      background: "transparent",
    };
  } else {
    remainderStyle = {
      color: "lightcoral",
      border: "0.3vw dashed lightcoral",
      background: "transparent",
    };
  }

  return (
    <div className="mix-container">
      {/* Quotient box */}
      <div
        id="mixed-quotient"
        className={
          successQuotient
            ? "border-dashed fade-in white-box"
            : "border-dashed fade-in"
        }
        style={quotientStyle}
      >
        {quotient == null ? 0 : quotient}
      </div>
      <div className="mix-right-fraction">
        <div id="mixed-remainder" className="border-dashed" style={remainderStyle}>
          {/* Remainder logic */}
          {showQuetientData && (
            <div>
              {quotient == null ? (
                0
              ) : multiply > questionData.dividend ? (
                <span style={{ color: "lightcoral", fontWeight: 600 }}>X</span>
              ) : (
                ""
              )}
              {/* Show EQ animation if needed */}
              {showEQ && multiply < questionData.dividend && (
                <p>{questionData.dividend - multiply}</p>
              )}
              {showEQVisible && multiply < questionData.dividend && (
                <div className={`fade-in`}>
                  <p
                    style={{
                      fontSize: "6vw",
                      color: "lightcoral",
                    }}
                  >
                    {questionData.divisor}+
                    {questionData.dividend - multiply - questionData.divisor}
                  </p>
                </div>
              )}
            </div>
          )}
          {showBoxRem && <div className="rem-box"></div>}
          {
            remainder!==null && <p>{remainder}</p>
          }
        </div>
        <div className="mix-fraction-line"></div>
        <div id="mixed-denominator">{denominator || 0}</div>
      </div>
    </div>
  );
};

export default MixedFraction;
