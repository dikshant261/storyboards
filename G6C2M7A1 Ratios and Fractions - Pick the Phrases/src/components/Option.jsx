import React from "react";
import "./option.css";
const Option = ({ optionNumber }) => {
  const handleOption = (num) => {
    optionNumber(num);
  };
  return (
    <div className="option-container">
      <button className="option" onClick={() => handleOption(1)}>
        <span>2</span>
        <span>×</span>
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>{1}</span>
          <span
            style={{
              borderTop: "0.2vw solid white",
              width: "100%",
              display: "block",
            }}
          ></span>
          <span>3</span>
        </span>
      </button>
      <button className="option" onClick={() => handleOption(2)}>
        <span>3</span>
        <span>×</span>
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>{1}</span>
          <span
            style={{
              borderTop: "0.2vw solid white",
              width: "100%",
              display: "block",
            }}
          ></span>
          <span>3</span>
        </span>
      </button>
      <button className="option" onClick={() => handleOption(3)}>
        <span>6</span>
        <span>×</span>
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>{1}</span>
          <span
            style={{
              borderTop: "0.2vw solid white",
              width: "100%",
              display: "block",
            }}
          ></span>
          <span>3</span>
        </span>
      </button>
    </div>
  );
};

export default Option;
