import React from "react";

const Division = ({
  numerator,
  denominator,
  fontSize = "2vw",
  color = "#fff",
  gap = "1vw",
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: gap,
        fontSize: fontSize,
        color: color,
        fontWeight: "bold",
        position: "fixed",
        top: "18%",
      }}
    >
      <span>{numerator}</span>
      <span>÷</span>
      <span>{denominator}</span>
    </div>
  );
};

export default Division;
