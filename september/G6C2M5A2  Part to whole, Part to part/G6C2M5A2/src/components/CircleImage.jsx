import React from "react";
import circle from "../assets/circle.png";
import rectangle from "../assets/rectangle.png";
import "./AppleImage.css";
const CircleImage = () => {
  return (
    <div className="circle-container">
      <img src={rectangle} className="rectangle" />
      <img src={rectangle} className="rectangle" />
      <div className="circle-align">
        <img src={circle} className="circle" />
        <img src={circle} className="circle" />
      </div>
      <img src={rectangle} className="rectangle" />
      <img src={circle} className="circle" />
      <img src={rectangle} className="rectangle" />
      <div className="circle-align">
        <img src={circle} className="circle" />
        <img src={circle} className="circle" />
      </div>
      <img src={rectangle} className="rectangle" />
      <div className="circle-align">
        <img src={circle} className="circle" />
        <img src={circle} className="circle" />
      </div>
    </div>
  );
};

export default CircleImage;
