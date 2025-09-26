import React, { useState } from "react";
import "./box.css";
import Fraction from "./Fraction";

const BoxThree = ({ divisor, style, number }) => {
  const [design, setDesign] = useState({
    border: "0.2vw dashed #aeb716",
    padding: "1vh 1vw 1vh 1vw",
    borderRadius: "0.8vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1vw",
  });
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
          style={{
            ...design,
          }}
        >
          <p>Group {index + 1}</p>
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
        </div>
      ))}
    </div>
  );
};

export default BoxThree;
