import React from "react";
import "./ballon.css";
import redballoon from "../assets/redballoon.png";
import blueballoon from "../assets/blueballoon.png";
const Balloon = () => {
  return (
    <div className="balloon-container">
      <div className="ballon-align">
        <img src={redballoon} className="red-balloon" />
        <img src={redballoon} className="red-balloon" />
        <img src={redballoon} className="red-balloon" />
        <img src={redballoon} className="red-balloon" />
      </div>
      <div className="ballon-align">
        <img src={blueballoon} className="blue-balloon" />
        <img src={blueballoon} className="blue-balloon" />
        <img src={blueballoon} className="blue-balloon" />
      </div>
    </div>
  );
};

export default Balloon;
