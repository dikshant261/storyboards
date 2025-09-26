import React from "react";
import "./TriangleImage.css";
import triangle from "../assets/triangle.png";
import square from "../assets/square.png";
const TriangleImage = () => {
  return (
    <div className="triangle-container">
      <img src={square} alt="Triangle" className="square" />
      <img src={square} alt="Triangle" className="square" />
      <img src={triangle} alt="Pentagon" className="triangle" />
      <img src={square} alt="Pentagon" className="square" />
      <img src={triangle} alt="Triangle" className="triangle" />
      <img src={square} alt="Triangle" className="square" />
      <img src={triangle} alt="Triangle" className="triangle" />
      <img src={triangle} alt="Pentagon" className="triangle" />
      <img src={triangle} alt="Triangle" className="triangle" />
      <img src={triangle} alt="Triangle" className="triangle" />
    </div>
  );
};

export default TriangleImage;
