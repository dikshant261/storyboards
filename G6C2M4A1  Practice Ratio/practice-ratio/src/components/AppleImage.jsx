import React from "react";
import "./AppleImage.css";
import apple from "../assets/apple.png";
import orange from "../assets/orange.png";
const AppleImage = () => {
  return (
    <div className="apple-container">
      <div className="apple-image">
        <img src={apple} alt="Apple" className="apple" />
        <img src={apple} alt="Apple" className="apple" />
        <img src={orange} alt="Orange" className="apple" />
        <img src={orange} alt="Orange" className="apple" />
      </div>
      <div className="apple-image">
        <img src={apple} alt="Apple" className="apple" />
        <img src={apple} alt="Apple" className="apple" />
        <img src={orange} alt="Orange" className="apple" />
        <img src={orange} alt="Orange" className="apple" />
        <img src={orange} alt="Orange" className="apple" />
      </div>
    </div>
  );
};

export default AppleImage;
