import React from "react";
import "./box.css";
const SentanceBox = ({ beat, boxCss, option, num, style,result }) => {
  return (
    <div className="box-container">
      <div className="box" style={style}>
        7
      </div>
      <div className="minus-line"></div>
      <div className="box" style={style}>
        {num}
      </div>
      <div className="equal-to">
        <div className="minus-line"></div>
        <div className="minus-line"></div>
      </div>
      <div className={`box ${beat ? "active" : ""} ${boxCss}`} style={style}>
        {option} {result}
      </div>
    </div>
  );
};

export default SentanceBox;
