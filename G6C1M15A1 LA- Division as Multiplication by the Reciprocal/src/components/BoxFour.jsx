import React, { useState } from "react";
import "./box.css";
import Fraction from "./Fraction";

const BoxFour = ({ divisor, style, number }) => {
  const fraction =
    divisor === "3" ? <Fraction numerator={1} denominator={3} /> : "";
  const height = 30 / divisor + "vh";
  return (
    <div
      className="box-container"
      style={{ flexDirection: "column", gap: "0" }}
    >
      <p>{number}</p>
      {Array.from({ length: divisor }).map((_, index) => (
        <div
          key={index}
          className="box"
          style={{
            height: height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2vh",
            ...style,
          }}
        >
          {fraction}
        </div>
      ))}
    </div>
  );
};

export default BoxFour;
