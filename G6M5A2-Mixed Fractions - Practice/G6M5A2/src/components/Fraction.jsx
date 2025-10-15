import React, { useEffect, useState } from "react";
import "./Fraction.css";

const Fraction = ({
  numerator,
  denominator,
  fontSize = "2vw",
  color = "white",
  lineWidth = "3vw",
  lineHeight = "0.2vh",
  showAnime,
}) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (showAnime) {
      setStartAnimation(true);
    }
  }, [showAnime]);
  return (
    <div className="question-fraction" style={{ fontSize, color }}>
      <span className="numerator">{numerator}</span>
      <span
        className="line"
        style={{
          width: lineWidth,
          height: lineHeight,
          backgroundColor: color,
        }}
      ></span>
      {startAnimation && (
        <span
          className={`line ${startAnimation ? "fly-in" : ""}`}
          style={{
            width: lineWidth,
            height: lineHeight,
            backgroundColor: color,
          }}
        ></span>
      )}
      <span className="denominator">{denominator}</span>
    </div>
  );
};

export default Fraction;
