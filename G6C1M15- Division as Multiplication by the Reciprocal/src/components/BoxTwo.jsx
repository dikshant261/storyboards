import React, { useState } from "react";
import "./box.css";
import Fraction from "./Fraction";

const BoxTwo = ({ divisor, style, number }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [design, setDesign] = useState();
  const fraction =
    divisor === "3" ? <Fraction numerator={1} denominator={3} /> : "";
  const height = 30 / divisor + "vh";
  console.log(divisor, "divisor");
  if (divisor === "3") {
    setInterval(() => {
      setShowAnimation(true);
      setDesign({
        border: "0.2vw dashed #aeb716",
        padding: "1vh 1vw 1vh 1vw",
        borderRadius: "0.8vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1vw",
      });
    }, 1500);
  }
  return (
    <div
      className="box-container"
      style={{ flexDirection: "column", gap: "0" }}
    >
      <p>{number}</p>
      {Array.from({ length: divisor }).map((_, index) => (
        <div
        key={index}
          style={{
            ...design,
          }}
        >
          {showAnimation && <p>Group {index + 1}</p>}
          <div
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

export default BoxTwo;
