import React from "react";
import './Option.css';

const Option = ({ numerator, denominator, onClick }) => {
  return (
    <div className="option-container">
      <div className="option-item" onClick={onClick}>
        <div>{numerator}</div>
        <div className="option-line"></div>
        <div>{denominator}</div>
      </div>
    </div>
  );
};

export default Option;
  