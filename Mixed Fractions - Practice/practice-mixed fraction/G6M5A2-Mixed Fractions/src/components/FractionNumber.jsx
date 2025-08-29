import React from "react";
import "./FrationNumber.css";

const FractionNumber = ({ numerator, denominator }) => {
  // Adjust font size dynamically based on digit length
  const maxLength = Math.max(
    numerator?.toString().length,
    denominator?.toString().length
  );
  const fontSize = maxLength > 2 ? "2vw" : "3vw"; // shrink if numbers are long

  return (
    <div className="fraction" style={{ fontSize }}>
      <span className="numerator">{numerator}</span>
      <span className="divider"></span>
      <span className="denominator">{denominator}</span>
    </div>
  );
};

export default FractionNumber;
