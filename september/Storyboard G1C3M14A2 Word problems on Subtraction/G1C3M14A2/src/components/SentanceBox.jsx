import React from "react";
import "./box.css";
const SentanceBox = ({ numOne, numTwo, result, boxCss }) => {
  return (
    <div className="box-container">
      <div className="sent-box" style={{ border: "none" }}>
        {numOne}
      </div>
      <div className="minus-line"></div>
      <div className="sent-box" style={{ border: "none" }}>
        {numTwo}
      </div>
      <div className="equal-to">
        <div className="minus-line"></div>
        <div className="minus-line"></div>
      </div>
      <div className={`sent-box white-color ${boxCss}`}>{result}</div>
    </div>
  );
};

export default SentanceBox;
