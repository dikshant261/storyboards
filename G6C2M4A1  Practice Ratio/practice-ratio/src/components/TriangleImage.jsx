import React from "react";
import "./TriangleImage.css";
import triangle from "../assets/triangle.png";
import pentagon from "../assets/pentagon.png";
const TriangleImage = () => {
  return (
    <div className="triangle-container">
      <img src={triangle} alt="Triangle" className="triangle" />
      <img src={triangle} alt="Triangle" className="triangle" />
      <img src={pentagon} alt="Pentagon" className="pentagon" />
      <img src={pentagon} alt="Pentagon" className="pentagon" />
      <img src={triangle} alt="Triangle" className="triangle" />
      <img src={triangle} alt="Triangle" className="triangle" />
      <img src={triangle} alt="Triangle" className="triangle" />
      <img src={pentagon} alt="Pentagon" className="pentagon" />
      <img src={triangle} alt="Triangle" className="triangle" />
      <img src={triangle} alt="Triangle" className="triangle" />
    </div>
  );
};

export default TriangleImage;
