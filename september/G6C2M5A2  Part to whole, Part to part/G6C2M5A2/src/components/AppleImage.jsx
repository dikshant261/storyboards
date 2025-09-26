import React from "react";
import "./AppleImage.css";
import greenball from "../assets/greenball.png";
import yellowball from "../assets/yellowball.png";
const AppleImage = () => {
  return (
    <div className="apple-container">
      <div className="apple-image">
        <img src={yellowball} alt="Apple" className="yellowball" />
        <img src={greenball} alt="Apple" className="apple" />
        <img src={yellowball} alt="Apple" className="yellowball" />
        <img src={greenball} alt="Apple" className="apple" />
        <img src={greenball} alt="Apple" className="apple" />
        <img src={greenball} alt="Apple" className="apple" />
        <img src={greenball} alt="Apple" className="apple" />
        <img src={yellowball} alt="Apple" className="yellowball" />
  </div>
    </div>
  );
};

export default AppleImage;
