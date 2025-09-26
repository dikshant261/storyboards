import React from "react";

const Division = ({
  numerator,
  denominator,
  mixed,
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
        top: "14%",
      }}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span>{numerator}</span>
        <span
          style={{
            width: "100%",
            height: "0.3vh",
            backgroundColor: "currentcolor",
          }}
        ></span>
        <span>{denominator}</span>
      </span>

      <span>÷</span>
      <span>{mixed}</span>
    </div>
  );
};

export default Division;
