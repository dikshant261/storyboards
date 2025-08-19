import React, { useEffect } from "react";
import "./mixfraction.css";
import Quotient from "./Quotient";
const MixedFraction = ({ quotient, remainder, denominator, questionData }) => {
  const [successQuotient, setSuccessQuotient] = React.useState(false);
  const [remainderSuccess, setRemainderSuccess] = React.useState(false);
  useEffect(() => {
    if (quotient === questionData.rightQuotient) {
      setSuccessQuotient(true);
    } else {
      setSuccessQuotient(false);
    }
  }, [quotient, questionData]);

  useEffect(() => {
    if (remainder === questionData.rightRemainder) {
      setRemainderSuccess(true);
    } else {
      setRemainderSuccess(false);
    }
  }, [remainder, questionData]);
  // Style logic for quotient
  let quotientStyle = {};
  if (quotient == null) {
    quotientStyle = {
      color: 'lightgray',
      border: '0.3vw dashed lightgray',
      background: 'transparent',
    };
  } else if (successQuotient) {
    quotientStyle = {
      color: 'var(--success-second-color)',
      border: 'none',
      background: 'transparent',
    };
  } else {
    quotientStyle = {
      color: 'lightcoral',
      border: '0.3vw dashed lightcoral',
      background: 'transparent',
    };
  }

  // Style logic for remainder
  let remainderStyle = {};
  if (remainder == null) {
    remainderStyle = {
      color: 'lightgray',
      border: '0.3vw dashed lightgray',
      background: 'transparent',
    };
  } else if (remainderSuccess) {
    remainderStyle = {
      color: 'var(--success-second-color)',
      border: 'none',
      background: 'transparent',
    };
  } else {
    remainderStyle = {
      color: 'lightcoral',
      border: '0.3vw dashed lightcoral',
      background: 'transparent',
    };
  }

  return (
    <div className="mix-container">
      <div className="border-dashed fade-in" style={quotientStyle}>
        {quotient == null ? 0 : quotient}
      </div>
      <div className="mix-right-fraction">
        <div className="border-dashed" style={remainderStyle}>
          {remainder == null ? 0 : remainder }
        </div>
        <div className="mix-fraction-line"></div>
        <div>{denominator || 0}</div>
      </div>
    </div>
  );
};

export default MixedFraction;
