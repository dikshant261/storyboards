import React from "react";
import "./progressbar.css";

const ProgressBar = ({ total = 5, current = 1 }) => {
  // Create an array of given length (total)
  const dots = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="progress-container">
      {dots.map((num) => (
        <div
          key={num}
          className="dot"
          style={{
            width: "2.5vw",
            height: "4vh",
            transform: current === num ? "scale(1.3)" : "scale(1)",
            backgroundColor:
              current === num ? "var(--secondary-color)" : "lightgray",
            transition: "all 0.3s ease",
            borderRadius: "50%",
          }}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
