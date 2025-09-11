import React from "react";
import "./fraction.css";
const FractionNuber = ({ question }) => {
  return (
    <div className="fraction">
      <p>{question[0]}</p>
      <p className="fraction-line"></p>
      <p>{question[1]}</p>
    </div>
  );
};

export default FractionNuber;
