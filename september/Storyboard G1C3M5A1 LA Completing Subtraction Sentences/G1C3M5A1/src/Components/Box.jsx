import React from "react";
import "./Box.css";
const Box = ({
  numberOne,
  numberTwo,
  numberThree,
  flag = false,
  showGreen,
}) => {
  return (
    <div className="box-container">
      <div className="box">{numberOne}</div>
      <div className="minus-line"></div>
      <div className="box">{numberTwo}</div>
      <div className="equal-to">
        <div className="minus-line"></div>
        <div className="minus-line"></div>
      </div>
      <div className={`box ${flag ? "box-pulse" : ""} ${showGreen}`}>
        {numberThree}
      </div>
    </div>
  );
};

export default Box;
